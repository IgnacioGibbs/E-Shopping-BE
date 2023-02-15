import { NotFoundException } from '@nestjs/common';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto';
import { validate as isUUID } from 'uuid';
import { ProductImage, Product } from './entities';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSources: DataSource,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], ...productDetail } = createProductDto;
      const product = this.productRepository.create({
        ...productDetail,
        images: images.map((image) =>
          this.productImageRepository.create({ url: image }),
        ),
      });
      await this.productRepository.save(product);

      return { ...product, images };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      const products = await this.productRepository.find({
        take: limit,
        skip: offset,
        relations: ['images'],
      });

      return products.map(({ images, ...productDetail }) => ({
        ...productDetail,
        images: images.map((image) => image.url),
      }));
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findOne(term: string) {
    let product: Product;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .where('slug = :slug or UPPER(title) = :title', {
          slug: term,
          title: term.toUpperCase(),
        })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();
    }
    if (!product) {
      throw new NotFoundException(`Product with id #${term} not found`);
    }

    return product;
  }

  async findOnePlain(term: string) {
    const { images = [], ...productDetail } = await this.findOne(term);
    return {
      ...productDetail,
      images: images.map((image) => image.url),
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images = [], ...productToUpdate } = updateProductDto;

    const product = await this.productRepository.preload({
      id,
      ...productToUpdate,
    });

    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }

    const queryRunner = this.dataSources.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });

        product.images = images.map((image) =>
          this.productImageRepository.create({ url: image }),
        );
      }

      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBException(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return { message: 'Product deleted' };
  }

  private handleDBException(error: any) {
    switch (error.code) {
      case '22P02':
        throw new BadRequestException('Invalid UUID', error.detail);
      case '23502':
        throw new BadRequestException('Error updating product', error.detail);
      case '23503':
        throw new BadRequestException('Error deleting product', error.detail);
      case '23505':
        throw new BadRequestException('Error creating product', error.detail);
      case '23514':
        throw new BadRequestException('Error creating product', error.detail);
      default:
        this.logger.error(error);
        throw new InternalServerErrorException(
          'Unexpected error - Check logs',
          error.detail,
        );
    }
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('prod');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.logger.error(error);
      this.handleDBException(error);
    }
  }
}
