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
import {
  ICategoryCreateDto,
  ICategoryUpdateDto,
} from 'src/domain/interfaces/category';
import { CategoryService } from 'src/infrastructure/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    const data = await this.categoryService.findAll();
    if (data.length === 0) {
      throw new HttpException(
        'Categorías no registradas',
        HttpStatus.NOT_FOUND,
      );
    }
    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.categoryService.findOne(id);
    return {
      status: HttpStatus.OK,
      message: 'Categoría encontrada',
      data: data,
    };
  }

  @Post()
  async create(@Body() createCategoryDto: ICategoryCreateDto) {
    const data = await this.categoryService.create(createCategoryDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Categoría creada',
      data: data,
    };
  }

  @Patch()
  async update(@Body() updateCategoryDto: ICategoryUpdateDto) {
    const data = await this.categoryService.update(updateCategoryDto);
    return {
      status: HttpStatus.OK,
      message: 'Categoría actualizada',
      data: data,
    };
  }

  @Patch(':id/state')
  async changeState(@Param('id') id: number) {
    const data = await this.categoryService.changeState(id);
    return {
      status: HttpStatus.OK,
      message: data.state
        ? 'Categoría activada correctamente'
        : 'Categoría eliminada correctamente',
      data: data,
    };
  }
}
