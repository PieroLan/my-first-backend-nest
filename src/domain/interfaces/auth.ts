import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class IUserRegisterDto {

    @IsString()
    @IsNotEmpty({ message: 'Contraseña requerida' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    password: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;

  @IsOptional()
  @IsArray({message: "Los roles deben enviarse como un arreglo"})
  @IsNumber({}, { each: true, message: 'Cada rol debe ser un número' })
  role_id?: number[];
}


export class IUserLoginDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Contraseña requerida' })
    password: string;
}