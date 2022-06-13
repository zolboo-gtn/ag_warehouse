import type { IPair } from "./pair";

export interface IVehicleModelDto {
  id: number;
  modelid: number;
  modelname: string;
  slug: string;
  yearstart: number;
  yearend: number;
  manuid: number;
  description: string | null;
  status: number;
  sort: number;
  created_at: string;
  updated_at: string;
}
export interface IVehicleModel extends IPair {}
