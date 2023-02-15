import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('text', { nullable: true })
  avatar: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  facebook: string;

  @Column('text', { nullable: true })
  instagram: string;

  @Column('text', { nullable: true })
  twitter: string;

  @Column('text', { nullable: true })
  tiktok: string;

  @Column('bool', { default: false })
  isActivated: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];
}
