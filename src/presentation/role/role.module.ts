import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/domain/entity';
import { RoleRepositoryImpl } from 'src/domain/repository/impl/role.repository.impl';
import { RoleService } from 'src/infrastructure/role.service';
import { RoleController } from './role.controller';
import { AuthCommonModule } from 'src/common/auth/auth-common.module';

@Module({
  controllers: [RoleController],
  imports: [TypeOrmModule.forFeature([RoleEntity]), AuthCommonModule],
  providers: [RoleService, RoleRepositoryImpl],
  exports: [RoleService],
})
export class RoleModule {}
