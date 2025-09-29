import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/entity';
import { UserRepositoryImpl } from 'src/domain/repository/impl/user.repository.impl';
import { UserService } from 'src/infrastructure/user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepositoryImpl],
  exports: [UserService],
})
export class UserModule {}
