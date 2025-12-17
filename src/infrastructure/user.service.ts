import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/domain/entity';
import {
  IUser,
  IUserCreateDto,
  IUserUpdateDto,
} from 'src/domain/interfaces/user';
import * as bcrypt from 'bcrypt';
import { UserRepositoryImpl } from 'src/domain/repository/impl/user.repository.impl';
import { EntityFormatter } from 'src/helpers/format/entity-format.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryImpl) { }

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

  async findByEmail(email: string): Promise<IUser> {
    return await this.userRepository.findOneByEmail(email);
  }

  async create(data: IUserCreateDto): Promise<IUser> {
    const { password, ...userData } = data;
    const existingUser  = await this.findByEmail(data.email);

    if (existingUser) {
      throw new HttpException('Ya existe una cuenta con este correo', HttpStatus.BAD_REQUEST);
    }

    //Solo si el registro se por fuera del sistema y no por un admin
    if (!userData.role_id) {
      userData.role_id = 2;
    }

    const user = {
      ...userData,
      password: bcrypt.hashSync(password, 10),
    }
    const userFormatted = EntityFormatter.format(user, UserEntity, {
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
