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
  ) { }
  
  findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email }, select: { id:true, email: true, password: true, isActive: true } });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({ where: { state: true } });
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id }, select: { id:true, email: true, isActive: true }});
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }
}
