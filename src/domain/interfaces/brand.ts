export interface IBrand {
  id: number;
  name: string;
  description: string;
  state: boolean;
  created_at: Date;
  updated_at: Date;
}

export class IBrandCreateDto {
  name: string;
  description: string;
}

export class IBrandUpdateDto {
  id: number;
  name?: string;
  description?: string;
}
