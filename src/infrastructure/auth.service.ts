import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';
import { IUserLoginDto, IUserRegisterDto } from "src/domain/interfaces/auth";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
    ) { }

    async login(data: IUserLoginDto) {
        const { email, password } = data;
        const user = await this.userService.findByEmail(email);
        
        if(!user) {
            throw new UnauthorizedException('Usuario no autorizado');
        }

        //si encuentra el usuario, validar la contraseña
        if (!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Usuario no autorizado');
        }
        return user;
    }

    async register(data: IUserRegisterDto) {
        return this.userService.create(data);
    }
}