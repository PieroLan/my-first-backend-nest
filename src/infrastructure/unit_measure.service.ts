import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UnitMeasureEntity } from 'src/domain/entity';
import {
  IUnitMeasure,
  IUnitMeasureCreateDto,
  IUnitMeasureUpdateDto,
} from 'src/domain/interfaces/unit_measure';
import { UnitMeasureRepositoryImpl } from 'src/domain/repository/impl/unit_measure.repository.impl';
import { EntityFormatter } from 'src/helpers/format/entity-format.service';

@Injectable()
export class UnitMeasureService {
  constructor(
    private readonly unitMeasureRepository: UnitMeasureRepositoryImpl,
  ) {}

  async findAll(): Promise<IUnitMeasure[]> {
    return await this.unitMeasureRepository.findAll();
  }

  async findOne(id: number): Promise<IUnitMeasure> {
    const data = await this.unitMeasureRepository.findOne(id);
    if (!data) {
      throw new HttpException(
        'Unidad de medida no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    return data;
  }

  async create(data: IUnitMeasureCreateDto): Promise<IUnitMeasure> {
    const unitMeasureFormatted = EntityFormatter.format(
      data,
      UnitMeasureEntity,
    );
    return await this.unitMeasureRepository.save(unitMeasureFormatted);
  }

  async update(data: IUnitMeasureUpdateDto): Promise<IUnitMeasure> {
    const exitingUnitMeasure = await this.unitMeasureRepository.findOne(
      data.id,
    );
    const unitMeasureFormatted = EntityFormatter.format(
      data,
      UnitMeasureEntity,
    );
    const updatedData = { ...exitingUnitMeasure, ...unitMeasureFormatted };
    return await this.unitMeasureRepository.save(updatedData);
  }

  async changeState(id: number): Promise<IUnitMeasure> {
    const unitMeasure = await this.findOne(id);
    unitMeasure.state = !unitMeasure.state;
    const unitMeasureFormatted = EntityFormatter.format(
      unitMeasure,
      UnitMeasureEntity,
    );
    return await this.unitMeasureRepository.save(unitMeasureFormatted);
  }
}
