import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/common/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/common/constants/valid-roles';
import { IUserRoleCreateDto, IUserRoleUpdateDto } from 'src/domain/interfaces/user_role';
import { UserRoleService } from 'src/infrastructure/user_role.service';

@Controller('user-role')
@Auth(ValidRoles.admin)
export class UserRoleController {
    constructor(
        private readonly userRoleService: UserRoleService
    ) { }

    @Get()
    async findAll() {
        const data = await this.userRoleService.findAll();
        if (data.length === 0)
            throw new HttpException('UserRoles no econtrados', HttpStatus.NOT_FOUND);
        return data;
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const data = await this.userRoleService.findOne(id);
        return {
            status: HttpStatus.OK,
            message: "UserRole encontrado",
            data: data
        }
    }

    @Post()
    async create(@Body() createUserRole: IUserRoleCreateDto) {
        const createdUser = await this.userRoleService.create(createUserRole);
        return {
            status: HttpStatus.CREATED,
            message: "UserRole creado correctamente",
            data: createdUser
        }
    }

    @Patch()
    async update(@Body() updateUserRole: IUserRoleUpdateDto) {
        const updatedUser = await this.userRoleService.update(updateUserRole);
        return {
            status: HttpStatus.OK,
            message: "UserRole actualizado correctamente",
            data: updatedUser
        }
    }

    @Patch(':id')
    async changeState(@Param('id') id: number){
        const updatedUser = await this.userRoleService.changeState(id);
        return {
            status: HttpStatus.OK,
            message: updatedUser.state ? 'UserRoles activado correctamente' : 'UserRole eliminado correctamente',
            data: updatedUser
        }
    }
}
