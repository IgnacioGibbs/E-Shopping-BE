import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from 'src/products/entities';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [CloudinaryModule, TypeOrmModule.forFeature([ProductImage])],
})
export class FilesModule {}
