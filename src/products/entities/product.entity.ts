import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '1499be79-b9ed-4caa-8b1d-5dd34599ad10',
    description: 'Product Id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Nike Air Max 270',
    description: 'Product title',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({ example: '$60.00', description: 'Product price' })
  @Column('numeric', { precision: 5, scale: 2 })
  price: number;

  @ApiProperty({
    example: 'Nike Air Max 270',
    description: 'Product description',
  })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({
    example: 'nike_air_max_270',
    description: 'Product slug - for SEO',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({ example: '10', description: 'Product stock', default: 0 })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({ example: '[ "M", "L", "XL" ]', description: 'Product sizes' })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({ example: 'unisex', description: 'product gender' })
  @Column('text')
  gender: string;

  @ApiProperty({ example: 'shoes', description: 'Product tags', default: [] })
  @Column('text', { array: true, default: () => "'{}'" })
  tags: string[];

  @ApiProperty({
    example: '[ image1.jpg, image2.jpg ]',
    description: 'Product images',
    default: [],
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ApiProperty({ example: '1', description: 'Product created by userId' })
  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @ApiProperty({
    example: 'true',
    description: 'Product is active',
    default: true,
  })
  @Column('boolean', { nullable: true, default: true })
  isActive: boolean;

  @ApiProperty({ example: '20-3-2023', description: 'product creation date' })
  @Column('date', { default: () => 'CURRENT_TIMESTAMP', nullable: true })
  createdAt: Date;

  @ApiProperty({ example: '20-3-2023', description: 'product update date' })
  @Column('date', { nullable: true })
  updatedAt: Date;

  @ApiProperty({ example: '20-3-2023', description: 'product delete date' })
  @Column('date', { nullable: true })
  deletedAt: Date;

  @BeforeInsert()
  async checkSlugInsert() {
    if (this.title) {
      this.slug = this.title;
    }

    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^\w-]+/g, '');
  }

  @BeforeUpdate()
  async checkSlugUpdate() {
    if (this.title) {
      this.slug = this.title;
    }

    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^\w-]+/g, '');
  }
  async updateDate() {
    this.updatedAt = new Date();
  }
}
