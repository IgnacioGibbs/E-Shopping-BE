import { NotFoundException } from '@nestjs/common';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      return await this.productRepository.find({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findOne(term: string) {
    let product: Product;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
        .where('slug = :slug or UPPER(title) = :title', {
          slug: term,
          title: term.toUpperCase(),
        })
        .getOne();
    }
    if (!product) {
      throw new NotFoundException(`Product with id #${term} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }

    try {
      return await this.productRepository.save(product);
    } catch (error) {
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
}
