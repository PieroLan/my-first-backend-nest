import { Module } from '@nestjs/common';
import { AuthService } from 'src/infrastructure/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/config/strategies/jwt.strategy';
import { UserRoleModule } from '../user-role/user-role.module';
import { UserRoleGuard } from './guards/user-role.guard';

@Module({
    imports: [UserModule,
        UserRoleModule,
        ConfigModule,
        // Configuración de JWT
        PassportModule.register({ defaultStrategy: 'jwt' }),

        // Configuración asíncrona del módulo JWT
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '2h' }, // 2 horas
                }
            },
        })
    ],
    providers: [JwtStrategy, AuthService, UserRoleGuard],
    controllers: [AuthController],
    exports: [JwtStrategy, AuthService, PassportModule, JwtModule],
})
export class AuthModule { }
