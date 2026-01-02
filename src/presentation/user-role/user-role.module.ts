import { Module } from '@nestjs/common';
import { UserRoleController } from './user-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleEntity } from 'src/domain/entity';
import { UserRoleService } from 'src/infrastructure/user_role.service';
import { UserRoleRepositoryImpl } from 'src/domain/repository/impl/user_role.repository.impl';
import { AuthCommonModule } from 'src/common/auth/auth-common.module';

@Module({
  controllers: [UserRoleController],
  imports: [TypeOrmModule.forFeature([UserRoleEntity]), AuthCommonModule],
  providers: [UserRoleService, UserRoleRepositoryImpl],
  exports: [UserRoleService]
})
export class UserRoleModule {}