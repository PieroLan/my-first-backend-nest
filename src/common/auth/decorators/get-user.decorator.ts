import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { IUserJwtReturn } from "src/common/interfaces/jwt/user-jwt-return.interface";


// la funcion createParamDecorator recibe un callback
export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContext) => {

        // obtenemos al usario verificado
        const req = ctx.switchToHttp().getRequest();
        const user = req.user as IUserJwtReturn;

        // si el usuario no existe lanzamos un error
        if (!user) {
            throw new InternalServerErrorException('No se pudo obtener el usuario - GetUser Decorator');
        }

        // si nos mandan argumentos data, retornamos solo esa propiedad del usuario
        return data ? user[data] : user;
    }
)