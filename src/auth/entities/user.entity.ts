import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/products/entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text')
  name: string;

  @Column('text')
  surname: string;

  @Column('int', { unique: true })
  dni: number;

  @Column('date')
  birthdate: Date;

  @Column('text', { nullable: true })
  phone: string;

  @Column('text', { nullable: true })
  address: string;

  @Column('text', { nullable: true })
  city: string;

  @Column('text', { nullable: true })
  country: string;

  @Column('text', { nullable: true })
  postalCode: string;

  @Column('text', { nullable: true, default: 'default-avatar.png' })
  avatar: string;

  @Column('text', { nullable: true })
  instagram: string;

  @Column('text', { nullable: true })
  twitter: string;

  @Column('text', { nullable: true })
  tiktok: string;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @Column('bool', { default: false })
  isActivated: boolean;

  @Column('date', { default: () => 'CURRENT_TIMESTAMP', nullable: true })
  createdAt: Date;

  @Column('date', { nullable: true })
  updatedAt: Date;

  @Column('date', { nullable: true })
  deletedAt: Date;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
  InsertTimestamp() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
