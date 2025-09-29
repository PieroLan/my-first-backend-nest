import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IBrand } from './brand';
import { ICategory } from './category';
import { IUnitMeasure } from './unit_measure';

export interface IProduct {
  id: number;
  sku?: string;
  name: string;
  description: string;
  bar_code: string;
  igv_apply: boolean;
  base_price: number;
  selling_price: number;
  category: ICategory; //FK to ICategory
  brand: IBrand; //FK to IBrand
  stock: number;
  min_stock: number;
  quantity: number;
  unit_measure: IUnitMeasure; //FK to IUnitMeasure
  image_url: string;
  state: boolean;
  created_at: Date;
  updated_at: Date;
}

export class IProductCreateDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'El código de barras es requerido' })
  bar_code: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'El IGV es requerido' })
  igv_apply: boolean;

  @IsNumber()
  @IsNotEmpty({ message: 'El precio base es requerido' })
  base_price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El precio de venta es requerido' })
  selling_price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la categoría es requerido' })
  category_id: number; //FK to ICategory

  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la marca es requerido' })
  brand_id: number; //FK to IBrand

  @IsNumber()
  @IsNotEmpty({ message: 'El stock es requerido' })
  stock: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El stock mínimo es requerido' })
  min_stock: number;

  @IsNumber()
  @IsNotEmpty({ message: 'La cantidad es requerida' })
  quantity: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la unidad de medida es requerido' })
  unit_measure_id: number; //FK to IUnitMeasure

  @IsString()
  @IsOptional()
  image_url?: string;
}

export class IProductUpdateDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El ID del producto es requerido' })
  id: number;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  bar_code?: string;

  @IsBoolean()
  @IsOptional()
  igv_apply?: boolean;

  @IsNumber()
  @IsOptional()
  base_price?: number;

  @IsNumber()
  @IsOptional()
  selling_price?: number;

  @IsNumber()
  @IsOptional()
  category_id?: number; //FK to ICategory

  @IsNumber()
  @IsOptional()
  brand_id?: number; //FK to IBrand

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsNumber()
  @IsOptional()
  min_stock?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  unit_measure_id?: number; //FK to IUnitMeasure

  @IsString()
  @IsOptional()
  image_url?: string;
}
