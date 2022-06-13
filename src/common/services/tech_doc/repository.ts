import type { AxiosInstance } from "axios";

import type {
  IVehicleManufacturer,
  IVehicleModel,
  IVehicleType,
  IVehicle,
  IVehicleDto,
  IVehicleManufacturerDto,
  IVehicleModelDto,
  IVehicleTypeDto,
} from "common/models";
import { BackendClient } from "common/services/backend_client";

import type { ITechDocRepository } from "./interface";

export class TechDocRepository implements ITechDocRepository {
  private static instance: TechDocRepository;
  private constructor(
    protected readonly client: AxiosInstance = BackendClient.getInstance()
  ) {}

  static getInstance(): TechDocRepository {
    if (!TechDocRepository.instance) {
      TechDocRepository.instance = new TechDocRepository();
    }

    return this.instance;
  }

  getManufacturers = async (): Promise<IVehicleManufacturer[]> => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const url = "/manufacturers";
    const {
      data: { data },
    } = await this.client.get<{ data: IVehicleManufacturerDto[] }>(url);

    return data.map(({ logo, manuid, manuname }) => ({
      key: `${manuid}`,
      value: manuname,
      logo,
    }));
  };
  getModels = async (manufacturerId: string): Promise<IVehicleModel[]> => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const params = new URLSearchParams({
      manuid: manufacturerId,
    });
    const url = `/models/?${params}`;
    const {
      data: { data },
    } = await this.client.get<{ data: IVehicleModelDto[] }>(url);

    return data.map(({ modelid, modelname }) => ({
      key: `${modelid}`,
      value: modelname,
    }));
  };
  getTypes = async (
    manufacturerId: string,
    modelId: string
  ): Promise<IVehicleType[]> => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const params = new URLSearchParams({
      manuid: manufacturerId,
      modelid: modelId,
    });
    const url = `/engines/?${params}`;
    const {
      data: { data },
    } = await this.client.get<{ data: IVehicleTypeDto[] }>(url);

    return data.map(({ carid, carname }) => ({
      key: `${carid}`,
      value: carname,
    }));
  };
  getVehicles = async (query: URLSearchParams): Promise<IVehicle[]> => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const url = `/carinfo?${query}`;
    const {
      data: { data },
    } = await this.client.get<{ data: IVehicleDto[] }>(url);

    return data.map(({ carid, manuid, modelid }) => ({
      id: `${carid}`,
      manufacturer: `${manuid}`,
      model: `${modelid}`,
      type: "",
    }));
  };
}
