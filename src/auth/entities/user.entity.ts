import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/products/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    example: '1499be79-b9ed-4caa-8b1d-5dd34599ad11',
    description: 'User Id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'useremail@email.com',
    description: 'User email',
    uniqueItems: true,
    nullable: false,
  })
  @Column('text', { unique: true })
  email: string;

  @ApiProperty({
    example: 'userPassword',
    description: 'User password',
    nullable: false,
  })
  @Column('text', { select: false })
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'User name',
    nullable: false,
  })
  @Column('text')
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User surname',
    nullable: false,
  })
  @Column('text')
  surname: string;

  @ApiProperty({
    example: '12345678',
    description: 'User DNI',
    nullable: false,
    uniqueItems: true,
  })
  @Column('int', { unique: true })
  dni: number;

  @ApiProperty({
    example: '1990-01-01',
    description: 'User birthdate',
    nullable: false,
  })
  @Column('date')
  birthdate: Date;

  @ApiProperty({
    example: '+5491123456789',
    description: 'User phone',
    nullable: true,
  })
  @Column('text', { nullable: true })
  phone: string;

  @ApiProperty({
    example: 'Fake street 1234',
    description: 'User address',
    nullable: true,
  })
  @Column('text', { nullable: true })
  address: string;

  @ApiProperty({
    example: 'Home Sweet Home',
    description: 'User city',
    nullable: true,
  })
  @Column('text', { nullable: true })
  city: string;

  @ApiProperty({
    example: 'Planet Earth',
    description: 'User country',
    nullable: true,
  })
  @Column('text', { nullable: true })
  country: string;

  @ApiProperty({
    example: '1234',
    description: 'User postal code',
    nullable: true,
  })
  @Column('text', { nullable: true })
  postalCode: string;

  @ApiProperty({
    example: 'default-avatar.png',
    description: 'User avatar',
    nullable: true,
  })
  @Column('text', { nullable: true, default: 'default-avatar.png' })
  avatar: string;

  @ApiProperty({
    example: 'https://www.facebook.com/user',
    description: 'User facebook',
    nullable: true,
  })
  @Column('text', { nullable: true })
  facebook: string;

  @ApiProperty({
    example: 'https://www.instagram.com/user',
    description: 'User instagram',
    nullable: true,
  })
  @Column('text', { nullable: true })
  instagram: string;

  @ApiProperty({
    example: 'https://www.twitter.com/user',
    description: 'User twitter',
    nullable: true,
  })
  @Column('text', { nullable: true })
  twitter: string;

  @ApiProperty({
    example: 'https://www.tiktok.com/user',
    description: 'User tiktok',
    nullable: true,
  })
  @Column('text', { nullable: true })
  tiktok: string;

  @ApiProperty({
    example: '["user", "admin"]',
    description: 'User roles',
    nullable: false,
  })
  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @ApiProperty({
    type: () => Product,
    isArray: true,
    example: '[ Product1, Product2]',
    description: 'User products',
    nullable: true,
  })
  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @ApiProperty({
    example: 'true',
    description: 'User is active',
    nullable: false,
  })
  @Column('bool', { default: false })
  isActive: boolean;

  @ApiProperty({
    example: '1990-01-01',
    description: 'User creation date',
    nullable: true,
  })
  @Column('date', { default: () => 'CURRENT_TIMESTAMP', nullable: true })
  createdAt: Date;

  @ApiProperty({
    example: '1990-01-01',
    description: 'User update date',
    nullable: true,
  })
  @Column('date', { nullable: true })
  updatedAt: Date;

  @ApiProperty({
    example: '1990-01-01',
    description: 'User delete date',
    nullable: true,
  })
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
