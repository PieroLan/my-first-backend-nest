import { Module } from '@nestjs/common';
import { AuthService } from 'src/infrastructure/auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
