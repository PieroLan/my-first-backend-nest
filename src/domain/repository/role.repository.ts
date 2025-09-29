import { RoleEntity } from '../entity';

export interface IRoleRepository {
  findAll(): Promise<RoleEntity[]>;
  findOne(id: number): Promise<RoleEntity>;
  save(role: RoleEntity): Promise<RoleEntity>;
}
