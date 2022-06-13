import produce from "immer";
import {
  DefaultValue,
  atom,
  selector,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";

import type { IPair } from "common/models";

interface IVehicleSearch {
  manufacturer: IPair | null;
  model: IPair | null;
  type: IPair | null;
}
const defaultState: IVehicleSearch = {
  manufacturer: null,
  model: null,
  type: null,
};
const vehicleSearch = atom<IVehicleSearch>({
  key: "vehicleSearch",
  default: defaultState,
});
const manufacturer = selector<IPair | null>({
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
const model = selector<IPair | null>({
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
const type = selector<IPair | null>({
  key: "type",
  get: ({ get }) => {
    const { type } = get(vehicleSearch);

    return type;
  },
  set: ({ set }, newValue) => {
    set(vehicleSearch, (oldValue) => {
      return newValue instanceof DefaultValue
        ? newValue
        : produce(oldValue, (draft) => {
            draft.type = newValue;
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
    const { manufacturer, model, type } = get(vehicleSearch);

    const params = new URLSearchParams();
    if (manufacturer) {
      params.append("manufacturerId", manufacturer.key);
    }
    if (model) {
      params.append("modelId", model.key);
    }
    if (type) {
      params.append("typeId", type.key);
    }

    return params;
  },
});

export const useVehicleSearch = () => ({
  manufacturer: useRecoilValue(manufacturer),
  setManufacturer: useSetRecoilState(manufacturer),
  model: useRecoilValue(model),
  setModel: useSetRecoilState(model),
  type: useRecoilValue(type),
  setType: useSetRecoilState(type),

  searchParams: useRecoilValue(searchParams),
  setSearchParams: useSetRecoilState(searchParams),
  tempSearchParams: useRecoilValue(tempSearchParams),

  reset: useResetRecoilState(vehicleSearch),
});
