import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { IUnitMeasureCreateDto, IUnitMeasureUpdateDto } from 'src/domain/interfaces/unit_measure';
import { UnitMeasureService } from 'src/infrastructure/unit_measure.service';

@Controller('unit-measure')
export class UnitMeasureController {
  constructor(private readonly unitMeasureService: UnitMeasureService) {}

  @Get()
  async findAll() {
    const data = await this.unitMeasureService.findAll();
    if (data.length === 0) {
      throw new HttpException('Unidades de medida no registradas', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.unitMeasureService.findOne(id);
    return {
      status: HttpStatus.OK,
      message: 'Unidad de medida encontrada',
      data: data,
    };
  }

  @Post()
  async create(@Body() createUnitMeasureDto: IUnitMeasureCreateDto) {
    const data = await this.unitMeasureService.create(createUnitMeasureDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Unidad de medida creada',
      data: data,
    };
  }

  @Patch()
  async update(@Body() updateUnitMeasureDto: IUnitMeasureUpdateDto) {
    const data = await this.unitMeasureService.update(updateUnitMeasureDto);
    return {
      status: HttpStatus.OK,
      message: 'Unidad de medida actualizada',
      data: data,
    };
  }

  @Patch(':id/state')
  async changeState(@Param('id') id: number) {
    const data = await this.unitMeasureService.changeState(id);
    return {
      status: HttpStatus.OK,
      message: data.state
        ? 'Unidad de medida activada correctamente'
        : 'Unidad de medida eliminada correctamente',
      data: data,
    };
  }
}
