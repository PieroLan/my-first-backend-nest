import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from 'src/infrastructure/brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from 'src/domain/entity';
import { BrandRepositoryImpl } from 'src/domain/repository/impl/brand.repository.impl';

@Module({
  controllers: [BrandController],
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  providers: [BrandService, BrandRepositoryImpl],
  exports: [BrandService],
})
export class BrandModule {}
