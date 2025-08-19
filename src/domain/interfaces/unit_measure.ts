export interface IUnitMeasure {
  id: number;
  name: string;
  state: boolean;
  created_at: Date;
  updated_at: Date;
}

export class IUnitMeasureCreateDto {
  name: string;
}
export class IUnitMeasureUpdateDto {
  id: number;
  name?: string;
}
