import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { IUser } from "src/domain/interfaces/user";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/infrastructure/user.service";
import { UserRoleService } from "src/infrastructure/user_role.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly userService: UserService,
    private readonly userRoleService: UserRoleService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // se ejecuta si el JWT no a expirado y si la firma es valida
  async validate(payload: JwtPayload) {
    const { id } = payload;
    const userFound = await this.userService.findOne(id);
    if (! userFound) {
      throw new UnauthorizedException('Token no valido');
    }

    if(! userFound.isActive){
      throw new UnauthorizedException('Usuario inactivo');
    }
    const roles = await this.userRoleService.findRolesByUserId(id)
    const user ={
      ...userFound,
      roles: roles
    }
    return user;
  }
}