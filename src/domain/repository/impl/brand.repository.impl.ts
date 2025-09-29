import { BrandEntity } from 'src/domain/entity';
import { IBrandRepository } from '../brand.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandRepositoryImpl implements IBrandRepository {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  async findAll(): Promise<BrandEntity[]> {
    return this.brandRepository.find({ where: { state: true } });
  }

  async findOne(id: number): Promise<BrandEntity> {
    return this.brandRepository.findOne({ where: { id } });
  }

  async save(branch: BrandEntity): Promise<BrandEntity> {
    return this.brandRepository.save(branch);
  }
}
