import { IBrand } from './brand';
import { ICategory } from './category';
import { IUnitMeasure } from './unit_measure';

export interface IProduct {
  id: number;
  sku: string;
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
  sku: string;
  name: string;
  description: string;
  bar_code: string;
  igv_apply: boolean;
  base_price: number;
  selling_price: number;
  category_id: number; //FK to ICategory
  brand_id: number; //FK to IBrand
  stock: number;
  min_stock: number;
  quantity: number;
  unit_measure_id: number; //FK to IUnitMeasure
  image_url: string;
}

export class IProductUpdateDto {
  id: number;
  sku?: string;
  name?: string;
  description?: string;
  bar_code?: string;
  igv_apply?: boolean;
  base_price?: number;
  selling_price?: number;
  category_id?: number; //FK to ICategory
  brand_id?: number; //FK to IBrand
  stock?: number;
  min_stock?: number;
  quantity?: number;
  unit_measure_id?: number; //FK to IUnitMeasure
  image_url?: string;
}
