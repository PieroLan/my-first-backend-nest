import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from 'src/common/constants/valid-roles';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from 'src/common/auth/guards/user-role.guard';
import { AuthGuard } from '@nestjs/passport';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles), // decorador personalizado
    UseGuards(AuthGuard('jwt'), UserRoleGuard)
  );
}
