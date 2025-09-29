import { UnitMeasureEntity } from '../entity';
export interface IUnitMeasureRepository {
  findAll(): Promise<UnitMeasureEntity[]>;
  findOne(id: number): Promise<UnitMeasureEntity>;
  save(unitMeasure: UnitMeasureEntity): Promise<UnitMeasureEntity>;
}
