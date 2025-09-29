import { UnitMeasureEntity } from 'src/domain/entity';
import { IUnitMeasureRepository } from '../unit_measure.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnitMeasureRepositoryImpl implements IUnitMeasureRepository {
  constructor(
    @InjectRepository(UnitMeasureEntity)
    private readonly unitMeasureRepository: Repository<UnitMeasureEntity>,
  ) {}

  async findAll(): Promise<UnitMeasureEntity[]> {
    return this.unitMeasureRepository.find({ where: { state: true } });
  }
  async findOne(id: number): Promise<UnitMeasureEntity> {
    return this.unitMeasureRepository.findOneBy({ id });
  }
  async save(unitMeasure: UnitMeasureEntity): Promise<UnitMeasureEntity> {
    return this.unitMeasureRepository.save(unitMeasure);
  }
}
