import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('numeric', { precision: 5, scale: 2 })
  price: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { unique: true })
  slug: string;

  @Column('int', { default: 0 })
  stock: number;

  @Column('text', { array: true })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column('text', { array: true, default: () => "'{}'" })
  tags: string[];

  @Column('boolean', { nullable: true, default: true })
  isActive: boolean;

  @Column('date', { default: () => 'CURRENT_TIMESTAMP', nullable: true })
  createdAt: Date;

  @Column('date', { nullable: true })
  updatedAt: Date;

  @Column('date', { nullable: true })
  deletedAt: Date;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

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
