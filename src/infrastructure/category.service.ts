import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/domain/entity';
import {
  ICategory,
  ICategoryCreateDto,
  ICategoryUpdateDto,
} from 'src/domain/interfaces/category';
import { CategoryRepositoryImpl } from 'src/domain/repository/impl/category.repository.impl';
import { EntityFormatter } from 'src/helpers/format/entity-format.service';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepositoryImpl) {}

  async findAll(): Promise<ICategory[]> {
    return await this.categoryRepository.findAll();
  }

  async findOne(id: number): Promise<ICategory> {
    const data = await this.categoryRepository.findOne(id);
    if (!data) {
      throw new HttpException('Categoría no encontrada', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async create(data: ICategoryCreateDto): Promise<ICategory> {
    const categoryFormatted = EntityFormatter.format(data, CategoryEntity);
    return await this.categoryRepository.save(categoryFormatted);
  }

  async update(data: ICategoryUpdateDto): Promise<ICategory> {
    const exitingCategory = await this.categoryRepository.findOne(data.id);
    const categoryFormatted = EntityFormatter.format(data, CategoryEntity);
    const updatedData = { ...exitingCategory, ...categoryFormatted };
    return await this.categoryRepository.save(updatedData);
  }

  async changeState(id: number): Promise<ICategory> {
    const category = await this.findOne(id);
    category.state = !category.state;
    const categoryFormatted = EntityFormatter.format(category, CategoryEntity);
    return await this.categoryRepository.save(categoryFormatted);
  }
}
