export interface IVehicleDto {
  id: number;
  carid: number;
  carname: string;
  cartype: string;
  modelid: number;
  manuid: number;
  description: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface IVehicle {
  id: string;
  manufacturer: string;
  model: string;
  type: string;
}
