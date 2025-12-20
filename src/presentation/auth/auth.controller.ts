import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUserLoginDto, IUserRegisterDto } from 'src/domain/interfaces/auth';
import { AuthService } from 'src/infrastructure/auth.service';

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
    testPrivateRoute() {
        return {
            status: HttpStatus.OK,
            message: 'Ruta privada accedida',
        };
    }

}
