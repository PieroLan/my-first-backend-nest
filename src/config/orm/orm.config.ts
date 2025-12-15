import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envs } from '../env/envs';
import * as Entities from '../../domain/entity';
@Injectable()
export class OrmConfig {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: envs.HOST,
      port: envs.PORT_DB,
      username: envs.USER_DB,
      password: envs.PASSWORD_DB,
      database: envs.DATABASE_DB,
      synchronize: true,
      schema: 'public',
      logging: true,
      entities: Entities,
    };
  }
}
