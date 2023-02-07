import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
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
}
