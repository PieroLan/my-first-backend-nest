import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserRoleGuard } from 'src/common/auth/guards/user-role.guard';

@Module({
    imports: [PassportModule],
    providers: [UserRoleGuard],
    exports: [PassportModule, UserRoleGuard]
})
export class AuthCommonModule { }
