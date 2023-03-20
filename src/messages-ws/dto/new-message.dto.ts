import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NewMessageDto {
  @ApiProperty({ example: 'someId' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Hello World!' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
