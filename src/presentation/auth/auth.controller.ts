import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUserLoginDto, IUserRegisterDto } from 'src/domain/interfaces/auth';
import { IUser } from 'src/domain/interfaces/user';
import { GetUser } from 'src/helpers/decorators/get-user.decorator';
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
    testPrivateRoute(
        @GetUser() user: IUser,
        @GetUser('email') email: String,
    ) {
        return {
            status: HttpStatus.OK,
            message: 'Ruta privada',
            user: user,
            email: email,
        };
    }
}