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
    user_name: string;
    password: string;
    role: IRole;
    state: boolean;
    created_at: Date;
    updated_at: Date;
  }

  export class IUserCreateDto {
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
    @Matches(/^[a-z0-9_-]+$/, {
      message:
        'El nombre de usuario solo puede contener letras minúsculas, números, guiones y guiones bajos.',
    })
    user_name?: string;

    @IsString()
    @IsOptional()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    password?: string;

    @IsNumber()
    @IsOptional()
    role_id?: number;
  }
