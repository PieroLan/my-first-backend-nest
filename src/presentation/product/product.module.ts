import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/domain/entity';
import { ProductService } from 'src/infrastructure/product.service';
import { ProductRepositoryImpl } from 'src/domain/repository/impl/product.repository.impl';

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductService, ProductRepositoryImpl],
  exports: [ProductService]
})
export class ProductModule {}
