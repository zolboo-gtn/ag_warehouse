import type {
  IVehicleManufacturer,
  IVehicleModel,
  IVehicleType,
  IVehicle,
} from "common/models";

export interface ITechDocRepository {
  getManufacturers: () => Promise<IVehicleManufacturer[]>;
  getModels: (manufacturerId: string) => Promise<IVehicleModel[]>;
  getTypes: (
    manufacturerId: string,
    modelId: string
  ) => Promise<IVehicleType[]>;
  getVehicles: (query: URLSearchParams) => Promise<IVehicle[]>;
}
