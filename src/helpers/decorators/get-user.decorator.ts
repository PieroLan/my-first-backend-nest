import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";


// la funcion createParamDecorator recibe un callback
export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContext) => {

        // obtenemos al usario verificado
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        // si el usuario no existe lanzamos un error
        if (!user) {
            throw new InternalServerErrorException('No se pudo obtener el usuario - GetUser Decorator');
        }

        // si nos mandan argumentos 
        if (data) {
            return user[data];
        }

        return user;
    }
)