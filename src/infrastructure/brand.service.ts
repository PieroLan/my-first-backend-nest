import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BrandEntity } from 'src/domain/entity';
import {
  IBrand,
  IBrandCreateDto,
  IBrandUpdateDto,
} from 'src/domain/interfaces/brand';
import { BrandRepositoryImpl } from 'src/domain/repository/impl/brand.repository.impl';
import { EntityFormatter } from 'src/helpers/format/entity-format.service';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepositoryImpl) {}

  async findAll(): Promise<IBrand[]> {
    return await this.brandRepository.findAll();
  }

  async findOne(id: number): Promise<IBrand> {
    const data = await this.brandRepository.findOne(id);
    if (!data) {
      throw new HttpException('Marca no encontrada', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async create(data: IBrandCreateDto): Promise<IBrand> {
    const brandFormatted = EntityFormatter.format(data, BrandEntity);
    return await this.brandRepository.save(brandFormatted);
  }

  async update(data: IBrandUpdateDto): Promise<IBrand> {
    const exitingBrand = await this.brandRepository.findOne(data.id);
    const brandFormatted = EntityFormatter.format(data, BrandEntity);
    const updatedData = { ...exitingBrand, ...brandFormatted };
    return await this.brandRepository.save(updatedData);
  }

  async changeState(id: number): Promise<IBrand> {
    const brand = await this.findOne(id);
    brand.state = !brand.state;
    const brandFormatted = EntityFormatter.format(brand, BrandEntity);
    return await this.brandRepository.save(brandFormatted);
  }
}
