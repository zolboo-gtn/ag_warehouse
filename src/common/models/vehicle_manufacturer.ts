import type { IPair } from "./pair";

export interface IVehicleManufacturerDto {
  id: number;
  manuid: number;
  manuname: string;
  slug: string;
  logo: string | null;
  description: string | null;
  status: number;
  sort: number;
  created_at: string;
  updated_at: string;
  carmodels_count: number;
}
export interface IVehicleManufacturer extends IPair {}
