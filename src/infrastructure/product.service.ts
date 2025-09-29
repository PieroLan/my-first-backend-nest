import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/domain/entity';
import {
  IProduct,
  IProductCreateDto,
  IProductUpdateDto,
} from 'src/domain/interfaces/product';
import { ProductRepositoryImpl } from 'src/domain/repository/impl/product.repository.impl';
import { EntityFormatter } from 'src/helpers/format/entity-format.service';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepositoryImpl) {}
  async findAll(): Promise<IProduct[]> {
    return await this.productRepository.findAll();
  }

  async findOne(id: number): Promise<IProduct> {
    const data = await this.productRepository.findOne(id);
    if (!data) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async create(data: IProductCreateDto): Promise<IProduct> {
    const productFormatted = EntityFormatter.format(data, ProductEntity, {
      category_id: 'category',
      brand_id: 'brand',
      unit_measure_id: 'unit_measure',
    });
    return await this.productRepository.save(productFormatted);
  }

  async update(data: IProductUpdateDto): Promise<IProduct> {
    const exitingProduct = await this.productRepository.findOne(data.id);
    const productFormatted = EntityFormatter.format(data, ProductEntity, {
      category_id: 'category',
      brand_id: 'brand',
      unit_measure_id: 'unit_measure',
    });
    const updatedData = { ...exitingProduct, ...productFormatted };
    return await this.productRepository.save(updatedData);
  }

  async changeState(id: number): Promise<IProduct> {
    const product = await this.findOne(id);
    product.state = !product.state;
    const productFormatted = EntityFormatter.format(product, ProductEntity);
    return await this.productRepository.save(productFormatted);
  }
}
