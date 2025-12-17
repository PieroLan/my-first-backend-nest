import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { IRole } from './role';

export interface IUser {
  id: number;
  password: string;
  email: string;
  role: IRole;
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

  @IsNumber()
  @IsOptional()
  role_id?: number;
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
