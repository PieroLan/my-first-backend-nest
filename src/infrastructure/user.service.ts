import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/domain/entity';
import {
  IUser,
  IUserCreateDto,
  IUserUpdateDto,
} from 'src/domain/interfaces/user';
import * as bcrypt from 'bcrypt';
import { UserRepositoryImpl } from 'src/domain/repository/impl/user.repository.impl';
import { DataSource } from 'typeorm'; // importante para transacciones (manager)
import { EntityFormatter } from 'src/helpers/format/entity-format.service';
import { UserRoleService } from './user_role.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryImpl,
    private readonly userRoleService: UserRoleService,
    private readonly dataSource: DataSource
  ) { }

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
    return await this.dataSource.transaction(async (manager) => {
      const { password, ...userData } = data;
      const existingUser = await this.findByEmail(data.email);

      if (existingUser) {
        throw new HttpException('Ya existe una cuenta con este correo', HttpStatus.BAD_REQUEST);
      }

      const user = {
        ...userData,
        password: bcrypt.hashSync(password, 10),
      }
      const userFormatted = EntityFormatter.format(user, UserEntity);
      const userSaved = await manager.save(UserEntity, userFormatted);
      for (const role of data.role_id) {
        let userRole = {
          role_id: role,
          user_id: userSaved.id
        }
        await this.userRoleService.create(userRole, manager);
      }
      return userSaved;
    });
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
