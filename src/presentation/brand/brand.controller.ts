import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BrandService } from 'src/infrastructure/brand.service';
import { IBrandCreateDto, IBrandUpdateDto } from 'src/domain/interfaces/brand';
import { Auth } from 'src/common/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/common/constants/valid-roles';


@Controller('brand')
@Auth(ValidRoles.admin, ValidRoles.user)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}


  @Get()
  async findAll() {
    const data = await this.brandService.findAll();
    if (data.length === 0) {
      throw new HttpException('Marcadas no registradas', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.brandService.findOne(id);
    return {
      status: HttpStatus.OK,
      message: 'Marca encontrada',
      data: data,
    };
  }

  @Post()
  async create(@Body() createBrandDto: IBrandCreateDto) {
    const data = await this.brandService.create(createBrandDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Marca creada',
      data: data,
    };
  }

  @Patch()
  async update(@Body() updateBrandDto: IBrandUpdateDto) {
    const data = await this.brandService.update(updateBrandDto);
    return {
      status: HttpStatus.OK,
      message: 'Marca actualizada',
      data: data,
    };
  }

  @Patch(':id/state')
  async changeState(@Param('id') id: number) {
    const data = await this.brandService.changeState(id);
    return {
      status: HttpStatus.OK,
      message: data.state
        ? 'Marca activada correctamente'
        : 'Marca eliminada correctamente',
      data: data,
    };
  }
}
