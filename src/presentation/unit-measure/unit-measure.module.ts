import { Module } from '@nestjs/common';
import { UnitMeasureController } from './unit-measure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitMeasureEntity } from 'src/domain/entity';
import { UnitMeasureService } from 'src/infrastructure/unit_measure.service';
import { UnitMeasureRepositoryImpl } from 'src/domain/repository/impl/unit_measure.repository.impl';

@Module({
  controllers: [UnitMeasureController],
  imports: [TypeOrmModule.forFeature([UnitMeasureEntity])],
  providers: [UnitMeasureService, UnitMeasureRepositoryImpl],
  exports: [UnitMeasureService],
})
export class UnitMeasureModule {}
