import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Nike Air Max 270',
    description: 'Product title',
    uniqueItems: true,
    nullable: false,
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 60, description: 'Product price', nullable: true })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 'Nike Air Max 270',
    description: 'Product description',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'nike_air_max_270',
    description: 'Product slug - for SEO',
    uniqueItems: true,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    example: 10,
    description: 'Product stock',
    default: 0,
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  stock?: number;

  @ApiProperty({
    example: ['M', 'L', 'XL'],
    description: 'Product sizes',
    nullable: true,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  sizes?: string[];

  @ApiProperty({
    example: 'unisex',
    description: 'Product gender',
    nullable: false,
  })
  @IsString()
  @IsIn(['men', 'women', 'kids', 'unisex'])
  gender: string;

  @ApiProperty({
    example: ['shoes', 'clothes'],
    description: 'Product tags',
    nullable: true,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    example: ['image1.jpg', 'image2.jpg'],
    description: 'Product images',
    nullable: true,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
