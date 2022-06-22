import produce from "immer";
import {
  DefaultValue,
  atom,
  selector,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";

import type {
  IPair,
  IVehicleEngine,
  IVehicleManufacturer,
  IVehicleModel,
} from "common/models";

interface IVehicleSearch {
  engine: IVehicleEngine | null;
  manufacturer: IVehicleManufacturer | null;
  model: IVehicleModel | null;
}
const defaultState: IVehicleSearch = {
  engine: null,
  manufacturer: null,
  model: null,
};
const vehicleSearch = atom<IVehicleSearch>({
  key: "vehicleSearch",
  default: defaultState,
});
const manufacturer = selector<IVehicleManufacturer | null>({
  key: "manufacturer",
  get: ({ get }) => {
    const { manufacturer } = get(vehicleSearch);

    return manufacturer;
  },
  set: ({ set }, newValue) => {
    set(vehicleSearch, (oldValue) => {
      return newValue instanceof DefaultValue
        ? newValue
        : produce(oldValue, (draft) => {
            draft.manufacturer = newValue;
          });
    });
  },
});
const model = selector<IVehicleModel | null>({
  key: "model",
  get: ({ get }) => {
    const { model } = get(vehicleSearch);

    return model;
  },
  set: ({ set }, newValue) => {
    set(vehicleSearch, (oldValue) => {
      return newValue instanceof DefaultValue
        ? newValue
        : produce(oldValue, (draft) => {
            draft.model = newValue;
          });
    });
  },
});
const engine = selector<IVehicleEngine | null>({
  key: "type",
  get: ({ get }) => {
    const { engine } = get(vehicleSearch);

    return engine;
  },
  set: ({ set }, newValue) => {
    set(vehicleSearch, (oldValue) => {
      return newValue instanceof DefaultValue
        ? newValue
        : produce(oldValue, (draft) => {
            draft.engine = newValue;
          });
    });
  },
});

const searchParams = atom<URLSearchParams>({
  key: "vehicleSearchParams",
  default: new URLSearchParams(),
});
const tempSearchParams = selector<URLSearchParams>({
  key: "tempVehicleSearchParams",
  get: ({ get }) => {
    const { engine, manufacturer, model } = get(vehicleSearch);

    const params = new URLSearchParams();
    if (manufacturer) {
      params.append("manufacturerId", manufacturer.key);
    }
    if (model) {
      params.append("modelId", model.key);
    }
    if (engine) {
      params.append("engineId", engine.key);
    }

    return params;
  },
});

export const useVehicleSearch = () => ({
  manufacturer: useRecoilValue(manufacturer),
  setManufacturer: useSetRecoilState(manufacturer),
  model: useRecoilValue(model),
  setModel: useSetRecoilState(model),
  engine: useRecoilValue(engine),
  setEngine: useSetRecoilState(engine),

  searchParams: useRecoilValue(searchParams),
  setSearchParams: useSetRecoilState(searchParams),
  tempSearchParams: useRecoilValue(tempSearchParams),

  reset: useResetRecoilState(vehicleSearch),
});
