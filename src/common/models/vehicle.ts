export interface IVehicleDto {
  carid: number;
  created_at: string;
  description: string | null;
  id: number;
  manuid: number;
  modelid: number;
  typenumber: number;
  updated_at: string;
}

export interface IVehicle {
  engineId: string;
  id: string;
  manufacturerId: string;
  modelId: string;
}
