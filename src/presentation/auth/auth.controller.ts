import { Body, Controller, Get, HttpStatus, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUserLoginDto, IUserRegisterDto } from 'src/domain/interfaces/auth';
import { IUser } from 'src/domain/interfaces/user';
import { IUserRole } from 'src/domain/interfaces/user_role';
import { GetUserRoles } from 'src/helpers/decorators/get-user-roles.decorator';
import { GetUser } from 'src/helpers/decorators/get-user.decorator';
import { RowHeaders } from 'src/helpers/decorators/row-hearders.decorator';
import { AuthService } from 'src/infrastructure/auth.service';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from 'src/helpers/decorators/role-protected.decorator';
import { ValidRoles } from 'src/config/strategies/interfaces/valid-roles';
import { Auth } from 'src/helpers/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() user: IUserRegisterDto) {
        const data = await this.authService.register(user);
        return {
            status: HttpStatus.CREATED,
            message: 'Usuario creado',
            data: data,
        };
    }

    @Post("login")
    async login(@Body() user: IUserLoginDto) {
        const data = await this.authService.login(user);
        return {
            status: HttpStatus.OK,
            message: 'Usuario autenticado',
            data: data,
        };
    }

    @Get('private')
    @UseGuards(AuthGuard())
    testPrivateRoute(
        @GetUser() user: IUser,
        @GetUser('email') email: String,
        @RowHeaders() headers: String[],
    ) {
        return {
            status: HttpStatus.OK,
            message: 'Ruta privada',
            user: user,
            email: email,
            headers: headers,
        };
    }

    @Get('private2')
    @UseGuards(AuthGuard(), UserRoleGuard)
    @SetMetadata('roles', ['admin'])
    testPrivateRoute2(
        @GetUser() user: IUser,
    ) {
        return {
            status: HttpStatus.OK,
            message: "Ruta privada 2",
            user: user
        }
    }

    @Get('private3')
    @UseGuards(AuthGuard(), UserRoleGuard)
    @RoleProtected(ValidRoles.admin) // decorador personalizado
    testPrivateRoute3(
        @GetUser() user: IUser,
    ) {
        return {
            status: HttpStatus.OK,
            message: "Ruta privada 2",
            user: user
        }
    }


    @Get('private4')
    @Auth(ValidRoles.admin)
    testPrivateRoute4(
        @GetUser() user: IUser,
    ) {
        return {
            status: HttpStatus.OK,
            message: "Ruta privada 2",
            user: user
        }
    }
}