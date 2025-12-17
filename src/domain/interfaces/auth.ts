import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class IUserRegisterDto {
    @IsString()
    @IsNotEmpty({ message: 'Nombre de usuario es requerido' })
    @Matches(/^[a-z0-9_-]+$/, {
        message:
            'El nombre de usuario solo puede contener letras minúsculas, números, guiones y guiones bajos.',
    })
    user_name: string;

    @IsString()
    @IsNotEmpty({ message: 'Contraseña requerida' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    password: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;

    @IsNumber()
    @IsOptional()
    role_id?: number;
}


export class IUserLoginDto {
    @IsString()
    @IsOptional()
    @Matches(/^[a-z0-9_-]+$/, {
        message:
            'El nombre de usuario solo puede contener letras minúsculas, números, guiones y guiones bajos.',
    })
    user_name?: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Contraseña requerida' })
    password: string;
}