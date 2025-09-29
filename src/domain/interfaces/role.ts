import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export interface IRole {
  id: number;
  name: string;
  state: boolean;
  created_at: Date;
  updated_at: Date;
}

export class IRoleCreateDto {
  @IsString()
  @IsNotEmpty({ message: 'Nombre de rol es requerido' })
  name: string;
}

export class IRoleUpdateDto {
  @IsNumber()
  @IsNotEmpty({ message: 'ID es requerido' })
  id: number;

  @IsString()
  @IsOptional()
  name?: string;
}
