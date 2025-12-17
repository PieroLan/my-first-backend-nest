import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { IUserLoginDto, IUserRegisterDto } from 'src/domain/interfaces/auth';
import { AuthService } from 'src/infrastructure/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async register(@Body() user: IUserRegisterDto) {
        const data = await this.authService.register(user);
        return {
            status: HttpStatus.CREATED,
            message: 'Usuario creado',
            data: data,
        };
    }

    @Post()
    async login(@Body() user: IUserLoginDto) {
        const data = await this.authService.login(user);
        return {
            status: HttpStatus.OK,
            message: 'Usuario autenticado',
            data: data,
        };
    }
}
