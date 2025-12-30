import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { IUserJwtReturn } from "src/config/strategies/interfaces/user-jwt-return.interface";

export const GetUserRoles = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as IUserJwtReturn;
    if (!user) {
        throw new InternalServerErrorException('No se pudo obtener el usuario - GetUser Decorator');
    }
    return user.roles;
});