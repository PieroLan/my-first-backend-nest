import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { IUser } from "src/domain/interfaces/user";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/infrastructure/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly userService: UserService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // se ejecuta si el JWT no a expirado y si la firma es valida
  async validate(payload: JwtPayload): Promise<IUser> {
    const { email } = payload;
    const user = await this.userService.findByEmail(email);
    if (! user) {
      throw new UnauthorizedException('Token no valido');
    }

    if(! user.isActive){
      throw new UnauthorizedException('Usuario inactivo');
    }

    return user;
  }
}