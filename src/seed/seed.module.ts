import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/products/product.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ProductsModule],
})
export class SeedModule {}
