import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/helpers/decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    //extraigo metadata de los roles que tienen acceso a dicha ruta
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

    //extraemos al usuario validado por el UserGuard que hemos configurado en la strategia de JWT
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user)
      throw new BadRequestException('Usuario no encontrado')

    //verificamos que el usuario tenga si quiera uno de los roles definidos
    for (const role of user.roles) {
      if (validRoles.includes(role.name)) {
        return true;
      }
    }
    throw new ForbiddenException('Usuario sin acceso, no tiene un rol valido')
  }
}
