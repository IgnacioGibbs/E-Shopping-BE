import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from 'src/products/entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    CloudinaryModule,
    TypeOrmModule.forFeature([ProductImage]),
    AuthModule,
  ],
})
export class FilesModule {}
