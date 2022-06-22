import type {
  IPartCategory,
  IVehicleEngine,
  IVehicleManufacturer,
  IVehicleModel,
  IVehicle,
} from "common/models";

export interface ITechDocRepository {
  getManufacturers: () => Promise<IVehicleManufacturer[]>;
  getModels: (manufacturerId: string) => Promise<IVehicleModel[]>;
  getEngines: (
    manufacturerId: string,
    modelId: string
  ) => Promise<IVehicleEngine[]>;
  getVehicle: (carId: string) => Promise<IVehicle | null>;
  getPartCategories: () => Promise<IPartCategory[]>;
}
