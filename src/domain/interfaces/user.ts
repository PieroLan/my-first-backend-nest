import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export interface IUser {
  id: number;
  password: string;
  email: string;
  isActive: boolean;
  state: boolean;
  created_at: Date;
  updated_at: Date;
}

export class IUserCreateDto {

  @IsString()
  @IsNotEmpty({ message: 'Contraseña requerida' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: "Email es requeridos" })
  email: string;

  @IsOptional()
  @IsArray({message: "Los roles deben enviarse como un arreglo"})
  @IsNumber({}, { each: true, message: 'Cada rol debe ser un número' })
  role_id?: number[];
}

export class IUserUpdateDto {
  @IsNumber()
  @IsNotEmpty({ message: 'ID es requerido' })
  id: number;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  password?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  role_id?: number;
}
