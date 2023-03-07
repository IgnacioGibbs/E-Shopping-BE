import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    example: 10,
    description: 'Limit number of results',
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // enable class-transformer to convert string to number === enableImplicitConversion: true
  limit?: number;

  @ApiProperty({
    example: 0,
    description: 'Offset number of results',
    required: false,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(0)
  offset?: number;
}
