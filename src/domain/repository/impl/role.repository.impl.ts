import { Injectable } from '@nestjs/common';
import { IRoleRepository } from '../role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/domain/entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepositoryImpl implements IRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll(): Promise<RoleEntity[]> {
    return this.roleRepository.find({ where: { state: true } });
  }

  async findOne(id: number): Promise<RoleEntity> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async save(role: RoleEntity): Promise<RoleEntity> {
    return this.roleRepository.save(role);
  }
}
