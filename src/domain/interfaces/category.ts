import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export interface ICategory {
  id: number;
  name: string;
  state: boolean;
  created_at: Date;
  updated_at: Date;
}

export class ICategoryCreateDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;
}
export class ICategoryUpdateDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El ID es requerido' })
  id: number;

  @IsString()
  @IsOptional()
  name?: string;
}
