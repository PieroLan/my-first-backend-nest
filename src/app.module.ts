import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './config/orm/orm.config';
import { BrandModule } from './presentation/brand/brand.module';
import { ProductModule } from './presentation/product/product.module';
import { CategoryModule } from './presentation/category/category.module';
import { UnitMeasureModule } from './presentation/unit-measure/unit-measure.module';
import { RoleModule } from './presentation/role/role.module';
import { UserModule } from './presentation/user/user.module';
import { AuthModule } from './presentation/auth/auth.module';
import { UserRoleModule } from './presentation/user-role/user-role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: OrmConfig,
    }),
    BrandModule,
    ProductModule,
    CategoryModule,
    UnitMeasureModule,
    RoleModule,
    UserModule,
    AuthModule,
    UserRoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
