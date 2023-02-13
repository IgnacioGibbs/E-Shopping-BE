import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsUUID } from 'class-validator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductImage } from 'src/products/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    private cloudinaryService: CloudinaryService,
  ) {}
  async uploadProductImage(file, id) {
    try {
      const result = await this.cloudinaryService.uploadImage(file);
      const productImage = this.productImageRepository.create({
        url: result.url,
        product: id,
      });
      await this.productImageRepository.save(productImage);
      return { message: 'Image uploaded successfully', url: result.url };
    } catch (error) {
      Logger.error(error);
    }
  }

  async deleteProductImage(id: string) {
    console.log(id);
    try {
      const productImage = await this.productImageRepository.findOneBy({
        id: id,
      });
      console.log(productImage);
      await this.cloudinaryService.deleteImage(productImage.url);
      await this.productImageRepository.delete(id);
      return { message: 'Image deleted successfully' };
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
