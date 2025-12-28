import { Module } from '@nestjs/common';
import { UserRoleController } from './user-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleEntity } from 'src/domain/entity';
import { UserRoleService } from 'src/infrastructure/user_role.service';
import { UserRoleRepositoryImpl } from 'src/domain/repository/impl/user_role.repository.impl';

@Module({
  controllers: [UserRoleController],
  imports: [TypeOrmModule.forFeature([UserRoleEntity])],
  providers: [UserRoleService, UserRoleRepositoryImpl],
  exports: [UserRoleService]
})
export class UserRoleModule {}