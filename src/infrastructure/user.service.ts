import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entity';
import {
  IUser,
  IUserCreateDto,
  IUserUpdateDto,
} from 'src/domain/interfaces/user';
import { UserRepositoryImpl } from 'src/domain/repository/impl/user.repository.impl';
import { EntityFormatter } from 'src/helpers/format/entity-format.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  async findAll(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<IUser> {
    const data = await this.userRepository.findOne(id);
    if (!data) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async create(data: IUserCreateDto): Promise<IUser> {
    if (!data.role_id) {
      data.role_id = 2;
    }
    const userFormatted = EntityFormatter.format(data, UserEntity, {
      role_id: 'role',
    });
    return await this.userRepository.save(userFormatted);
  }

  async update(data: IUserUpdateDto): Promise<IUser> {
    const existingUser = await this.userRepository.findOne(data.id);
    const userFormatted = EntityFormatter.format(data, UserEntity);
    const updatedData = { ...existingUser, ...userFormatted };
    return await this.userRepository.save(updatedData);
  }

  async changeState(id: number): Promise<IUser> {
    const user = await this.findOne(id);
    user.state = !user.state;
    const userFormatted = EntityFormatter.format(user, UserEntity);
    return await this.userRepository.save(userFormatted);
  }
}
