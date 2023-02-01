import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // enable class-transformer to convert string to number === enableImplicitConversion: true
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(0)
  offset?: number;
}
