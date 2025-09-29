import { ProductEntity } from 'src/domain/entity';
import { IProductRepository } from '../product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepositoryImpl implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find({ where: { state: true } });
  }
  async findOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne({ where: { id } });
  }
  async save(product: ProductEntity): Promise<ProductEntity> {
    return this.productRepository.save(product);
  }
}
