import { ProductEntity } from '../entity';

export interface IProductRepository {
  findAll(): Promise<ProductEntity[]>;
  findOne(id: number): Promise<ProductEntity>;
  save(product: ProductEntity): Promise<ProductEntity>;
}
