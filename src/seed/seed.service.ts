import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/products/product.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductService) {}

  async runSeed() {
    await this.insertProducts();
    return 'Seed executed';
  }

  private async insertProducts() {
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    for (const product of products) {
      insertPromises.push(this.productService.create(product));
    }

    await Promise.all(insertPromises);

    return 'Products inserted';
  }
}
