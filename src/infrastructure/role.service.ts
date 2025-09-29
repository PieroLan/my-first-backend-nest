import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/domain/entity';
import {
  IRole,
  IRoleCreateDto,
  IRoleUpdateDto,
} from 'src/domain/interfaces/role';
import { RoleRepositoryImpl } from 'src/domain/repository/impl/role.repository.impl';
import { EntityFormatter } from 'src/helpers/format/entity-format.service';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepositoryImpl) {}

  async findAll(): Promise<IRole[]> {
    return this.roleRepository.findAll();
  }

  async findOne(id: number): Promise<IRole> {
    const data = await this.roleRepository.findOne(id);
    if (!data) {
      throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async create(data: IRoleCreateDto): Promise<IRole> {
    const roleFormatted = EntityFormatter.format(data, RoleEntity);
    return await this.roleRepository.save(roleFormatted);
  }

  async update(data: IRoleUpdateDto): Promise<IRole> {
    const existingRole = await this.roleRepository.findOne(data.id);
    const roleFormatted = EntityFormatter.format(data, RoleEntity);
    const updatedData = { ...existingRole, ...roleFormatted };
    return await this.roleRepository.save(updatedData);
  }

  async changeState(id: number): Promise<IRole> {
    const role = await this.findOne(id);
    role.state = !role.state;
    const roleFormatted = EntityFormatter.format(role, RoleEntity);
    return await this.roleRepository.save(roleFormatted);
  }
}
