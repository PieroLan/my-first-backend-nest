import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export interface IBrand {
  id: number;
  name: string;
  description: string;
  state: boolean;
  created_at: Date;
  updated_at: Date;
}

export class IBrandCreateDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @IsString()
  @IsOptional({ message: 'La descripción es opcional' })
  description: string;
}

export class IBrandUpdateDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El ID es requerido' })
  id: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
