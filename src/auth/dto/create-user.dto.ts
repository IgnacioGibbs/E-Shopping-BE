import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsPostalCode,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'useremail@email.com',
    description: 'User email',
    uniqueItems: true,
    nullable: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'userPassword',
    description: 'User password',
    nullable: false,
    minLength: 6,
    maxLength: 18,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(18)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too week. Passwords will contain at least 1 upper case letter, 1 lower case letter and 1 number or special character',
  })
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'User name',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User surname',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    example: '12345678',
    description: 'User DNI',
    nullable: false,
    uniqueItems: true,
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  dni: number;

  @ApiProperty({
    example: '1990-01-01',
    description: 'User birthdate',
    nullable: false,
  })
  @IsDateString({ strict: true })
  @IsNotEmpty()
  birthdate: Date;

  @ApiProperty({
    example: '+5491123456789',
    description: 'User phone',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @IsMobilePhone('es-AR')
  phone?: string;

  @ApiProperty({
    example: 'userAddress',
    description: 'User address',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: 'userCity',
    description: 'User city',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    example: 'userCountry',
    description: 'User country',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    example: '1234',
    description: 'User postal code',
    nullable: true,
  })
  @IsString()
  @IsPostalCode('any')
  @IsOptional()
  postalCode?: string;

  @ApiProperty({
    example: 'default-avatar.png',
    description: 'User avatar',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    example: 'https://www.facebook.com/user',
    description: 'User facebook',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  facebook?: string;

  @ApiProperty({
    example: 'https://www.instagram.com/user',
    description: 'User instagram',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  instagram?: string;

  @ApiProperty({
    example: 'https://www.twitter.com/user',
    description: 'User twitter',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  twitter?: string;

  @ApiProperty({
    example: 'https://www.tiktok.com/user',
    description: 'User tiktok',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  tiktok?: string;
}
