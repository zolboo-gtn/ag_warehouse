import type { IPair } from "./pair";

type TCategory = "P";
export interface IVehicleTypeDto {
  id: number;
  carid: number;
  carname: string;
  cartype: TCategory;
  modelid: number;
  manuid: number;
  description: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}
export interface IVehicleType extends IPair {
  manufacturerId: string;
  modelId: string;
}
