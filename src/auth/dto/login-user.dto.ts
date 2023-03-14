import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
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
}
