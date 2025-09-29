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
  IProductCreateDto,
  IProductUpdateDto,
} from 'src/domain/interfaces/product';
import { ProductService } from 'src/infrastructure/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    const data = await this.productService.findAll();
    if (data.length === 0) {
      throw new HttpException('Productos no registrados', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.productService.findOne(id);
    return {
      status: HttpStatus.OK,
      message: 'Producto encontrado',
      data: data,
    };
  }

  @Post()
  async create(@Body() createProductDto: IProductCreateDto) {
    const data = await this.productService.create(createProductDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Producto creado',
      data: data,
    };
  }

  @Patch()
  async update(@Body() updateProductDto: IProductUpdateDto) {
    const data = await this.productService.update(updateProductDto);
    return {
      status: HttpStatus.OK,
      message: 'Producto actualizado',
      data: data,
    };
  }

  @Patch(':id/state')
  async changeState(@Param('id') id: number) {
    const data = await this.productService.changeState(id);
    return {
      status: HttpStatus.OK,
      message: data.state
        ? 'Producto activado correctamente'
        : 'Producto eliminado correctamente',
      data: data,
    };
  }
}
