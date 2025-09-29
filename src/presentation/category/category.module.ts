import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/domain/entity';
import { CategoryService } from 'src/infrastructure/category.service';
import { CategoryRepositoryImpl } from 'src/domain/repository/impl/category.repository.impl';

@Module({
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService, CategoryRepositoryImpl],
  exports: [CategoryService]
})
export class CategoryModule {}
