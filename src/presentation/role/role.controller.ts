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
import { ValidRoles } from 'src/config/strategies/interfaces/valid-roles';
import { IRoleCreateDto, IRoleUpdateDto } from 'src/domain/interfaces/role';
import { Auth } from 'src/helpers/decorators/auth.decorator';
import { RoleService } from 'src/infrastructure/role.service';

@Controller('role')
@Auth(ValidRoles.admin)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll() {
    const data = await this.roleService.findAll();
    if (data.length === 0) {
      throw new HttpException('Roles no registrados', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.roleService.findOne(id);
    return {
      status: HttpStatus.OK,
      message: 'Rol encontrado',
      data: data,
    };
  }

  @Post()
  async create(@Body() createRoleDto: IRoleCreateDto) {
    const data = await this.roleService.create(createRoleDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Rol creado',
      data: data,
    };
  }

  @Patch()
  async update(@Body() updateRoleDto: IRoleUpdateDto) {
    const data = await this.roleService.update(updateRoleDto);
    return {
      status: HttpStatus.OK,
      message: 'Rol actualizado',
      data: data,
    };
  }

  @Patch(':id/state')
  async changeState(@Param('id') id: number) {
    const data = await this.roleService.changeState(id);
    return {
      status: HttpStatus.OK,
      message: data.state
        ? 'Rol activado correctamente'
        : 'Rol eliminado correctamente',
      data: data,
    };
  }
}
