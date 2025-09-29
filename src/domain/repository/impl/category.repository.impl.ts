import { CategoryEntity } from 'src/domain/entity';
import { ICategoryRepository } from '../category.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepositoryImpl implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({ where: { state: true } });
  }
  async findOne(id: number): Promise<CategoryEntity> {
    return this.categoryRepository.findOne({ where: { id } });
  }
  async save(category: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryRepository.save(category);
  }
}
