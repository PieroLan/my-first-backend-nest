import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/common/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/common/constants/valid-roles';
import { IUserCreateDto, IUserUpdateDto } from 'src/domain/interfaces/user';
import { UserService } from 'src/infrastructure/user.service';

@Controller('user')
@Auth(ValidRoles.admin)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll() {
    const data = await this.userService.findAll();
    if (data.length === 0) {
      throw new HttpException('Usuarios no registrados', HttpStatus.NOT_FOUND);
    }
    return {
      status: HttpStatus.OK,
      message: 'Usuarios encontrados',
      data: data
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.userService.findOne(id);
    return {
      status: HttpStatus.OK,
      message: 'Usuario encontrado',
      data: data,
    };
  }

  @Post()
  async create(@Body() createUserDto: IUserCreateDto) {
    const data = await this.userService.create(createUserDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Usuario creado',
      data: data,
    };
  }

  @Patch()
  async update(@Body() updateUserDto: IUserUpdateDto) {
    const data = await this.userService.update(updateUserDto);
    return {
      status: HttpStatus.OK,
      message: 'Usuario actualizado',
      data: data,
    };
  }

  @Patch(':id/state')
  async changeState(@Param('id') id: number) {
    const data = await this.userService.changeState(id);
    return {
      status: HttpStatus.OK,
      message: data.state
        ? 'Usuario activado correctamente'
        : 'Usuario eliminado correctamente',
      data: data,
    };
  }
}
