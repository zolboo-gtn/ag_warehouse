import type { AxiosInstance } from "axios";

import type {
  IPartCategory,
  IPartCategoryDto,
  IVehicleEngine,
  IVehicleManufacturer,
  IVehicleModel,
  IVehicle,
  IVehicleDto,
  IVehicleEngineDto,
  IVehicleManufacturerDto,
  IVehicleModelDto,
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
    const url = "/manufacturers";
    const {
      data: { data },
    } = await this.client.get<{ data: IVehicleManufacturerDto[] }>(url);

    if (!data) {
      return [];
    }

    return data.map(({ logo, manuid, manuname }) => ({
      key: `${manuid}`,
      value: manuname,
      //
      logo: logo ?? null,
    }));
  };
  getModels = async (manufacturerId: string): Promise<IVehicleModel[]> => {
    const params = new URLSearchParams({
      manuid: manufacturerId,
    });
    const url = `/models/?${params}`;
    const {
      data: { data },
    } = await this.client.get<{ data: IVehicleModelDto[] }>(url);

    if (!data) {
      return [];
    }

    return data.map(({ manuid, modelid, modelname }) => ({
      key: `${modelid}`,
      value: modelname,
      //
      manufacturerId: `${manuid}`,
    }));
  };
  getEngines = async (
    manufacturerId: string,
    modelId: string
  ): Promise<IVehicleEngine[]> => {
    const params = new URLSearchParams({
      manuid: manufacturerId,
      modid: modelId,
    });
    const url = `/engines/?${params}`;
    const {
      data: { data },
    } = await this.client.get<{ data: IVehicleEngineDto[] }>(url);

    if (!data) {
      return [];
    }

    return data.map(({ carid, carname, manuid, modelid }) => ({
      key: `${carid}`,
      value: carname,
      //
      manufacturerId: `${manuid}`,
      modelId: `${modelid}`,
    }));
  };
  getVehicle = async (carId: string): Promise<IVehicle | null> => {
    const params = new URLSearchParams({
      carid: carId,
    });
    const url = `/carinfo?${params}`;
    const {
      data: { data },
    } = await this.client.get<{ data: IVehicleDto }>(url);

    if (!data) {
      return null;
    }

    return {
      engineId: `${data.typenumber}`,
      id: `${data.id}`,
      manufacturerId: `${data.manuid}`,
      modelId: `${data.modelid}`,
    };
  };
  getPartCategories = async (): Promise<IPartCategory[]> => {
    const url = `/categories`;
    const {
      data: { data },
    } = await this.client.get<{ data: IPartCategoryDto[] }>(url);

    if (!data) {
      return [];
    }

    return data.map(
      ({
        categorygroupid,
        categoryname,
        parentid,
        // TODO: use children
        categories,
        child_categories,
      }) => ({
        children: (categories ?? child_categories ?? []).map(
          ({ categorygroupid, categoryname, parentid }) => ({
            children: [],
            id: `${categorygroupid}`,
            name: categoryname,
            parentId: `${parentid}`,
          })
        ),
        id: `${categorygroupid}`,
        name: categoryname,
        parentId: `${parentid}`,
      })
    );
  };
}
