import { BrandEntity } from '../entity';

export interface IBrandRepository {
  findAll(): Promise<BrandEntity[]>;
  findOne(id: number): Promise<BrandEntity>;
  save(branch: BrandEntity): Promise<BrandEntity>;
}
