import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({ where: { state: true } });
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }
}
