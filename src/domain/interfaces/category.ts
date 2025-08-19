export interface ICategory {
  id: number;
  name: string;
  state: boolean;
  created_at: Date;
  updated_at: Date;
}

export class ICategoryCreateDto {
  name: string;
}
export class ICategoryUpdateDto {
  id: number;
  name?: string;
}
