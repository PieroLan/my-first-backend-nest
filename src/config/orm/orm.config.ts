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
      username: envs.USER,
      password: envs.PASSWORD,
      database: envs.DATABASE,
      synchronize: true,
      schema: 'public',
      logging: true,
      entities: Entities,
    };
  }
}
