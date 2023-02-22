import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'product_images' })
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  url: string;

  @Column('boolean', { nullable: true, default: true })
  isActive: boolean;

  @Column('date', { default: () => 'CURRENT_TIMESTAMP', nullable: true })
  createdAt: Date;

  @Column('date', { nullable: true })
  updatedAt: Date;

  @Column('date', { nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
