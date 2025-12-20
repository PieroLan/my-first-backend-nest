import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';
import { IUserLoginDto, IUserRegisterDto } from "src/domain/interfaces/auth";
import { JwtPayload } from "src/config/strategies/interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(data: IUserLoginDto) {
        const { email, password } = data;
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Usuario no autorizado');
        }

        //si encuentra el usuario, validar la contraseña
        if (!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Usuario no autorizado');
        }
        // devuelve el usuario y el token
        return {
            user:{
                id: user.id,
                email: user.email,
                isActive: user.isActive,
                role: user.role,
            },
            token: this.getJwtToken({ email: user.email })
        };
    }

    async register(data: IUserRegisterDto) {
        const userCreate = await this.userService.create(data);

        // devuelve el usuario y el token
        return {
            user:{
                id: userCreate.id,
                email: userCreate.email,
                isActive: userCreate.isActive,
                role: userCreate.role,
            },
            token: this.getJwtToken({ email: userCreate.email })
        };
    }

    //generamos Token JWT
    private getJwtToken(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

}