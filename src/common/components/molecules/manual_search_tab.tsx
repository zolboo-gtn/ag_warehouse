import { SearchIcon, XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { FC, FormEvent } from "react";

import { CustomSelect } from "common/components";
import { useGetManufacturers, useGetModels, useGetTypes } from "common/hooks";
import type {
  IPair,
  IVehicleManufacturer,
  IVehicleModel,
  IVehicleType,
} from "common/models";
import { useVehicleSearch } from "common/recoil";
import { classNames, useDebouncedValue } from "common/utils";

export interface IManualSearchTab
  extends IManufacturerSelect,
    IModelSelect,
    ITypeSelect {}
export const ManualSearchTab: FC<IManualSearchTab> = ({
  manufacturers,
  models,
  types,
}) => {
  const { reset } = useVehicleSearch();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // let url = "/vehicles";
    // if (manufacturer) {
    //   url += `/${manufacturer.key}`;
    //   if (model) {
    //     url += `/${model.key}`;
    //     if (type) {
    //       url += `/${type.key}`;
    //     }
    //   }
    // }
    // push(url);
  };
  return (
    <form className="flex flex-col gap-y-2 p-2" onSubmit={onSubmit}>
      <h5>{`Manual Search`}</h5>
      <ManufacturerSelect manufacturers={manufacturers} />
      <ModelSelect models={models} />
      <TypeSelect types={types} />
      <div className="mt-2 flex gap-x-2">
        <button
          type="button"
          className={classNames(
            "flex h-10 w-full items-center justify-center rounded-md bg-red-400 duration-200",
            "disabled:opacity-40"
          )}
          onClick={reset}
        >
          <XIcon className="h-5 w-5 text-white" />
        </button>
        {/* <button className="flex h-10 w-full items-center justify-center rounded-md bg-blue-400">
          <SearchIcon className="h-5 w-5 text-white" />
        </button> */}
      </div>
    </form>
  );
};

export interface IManufacturerSelect {
  manufacturers: IVehicleManufacturer[];
}
const ManufacturerSelect: FC<IManufacturerSelect> = ({
  manufacturers = [],
}) => {
  const router = useRouter();
  const {
    query: { manId },
  } = router;

  const { manufacturer, setManufacturer, setModel, setType } =
    useVehicleSearch();

  // set initial value
  useEffect(() => {
    const _manufacturer =
      manufacturers.find((manufacturer) => manufacturer.key === manId) ?? null;
    setManufacturer(_manufacturer);
  }, [manId]);

  return (
    <CustomSelect
      instanceId="manufacturer"
      isClearable
      options={manufacturers}
      placeholder={`Manufacturer`}
      value={manufacturer}
      onChange={(value) => {
        if (!value) {
          setModel(null);
          setType(null);
        }
        setManufacturer(value);
        router.push(value ? `/vehicles/${value.key}` : "/vehicles");
      }}
    />
  );
};

export interface IModelSelect {
  models: IVehicleModel[];
}
const ModelSelect: FC<IModelSelect> = ({ models = [] }) => {
  const router = useRouter();
  const {
    query: { manId, modId },
  } = router;

  const { model, setModel, setType } = useVehicleSearch();

  // set initial value
  useEffect(() => {
    const _models = models.find((model) => model.key === modId) ?? null;
    setModel(_models);
  }, [modId]);

  return (
    <CustomSelect
      instanceId="model"
      isClearable
      isDisabled={models.length === 0}
      options={models}
      placeholder={`Model`}
      value={model}
      onChange={(value) => {
        if (!value) {
          setType(null);
        }
        setModel(value);
        router.push(
          value ? `/vehicles/${manId}/${value.key}` : `/vehicles/${manId}`
        );
      }}
    />
  );
};

export interface ITypeSelect {
  types: IVehicleType[];
}
const TypeSelect: FC<ITypeSelect> = ({ types = [] }) => {
  const router = useRouter();
  const {
    query: { manId, modId, typeId },
  } = router;

  const { type, setType } = useVehicleSearch();

  // set initial value
  useEffect(() => {
    const _type = types.find((type) => type.key === typeId) ?? null;
    setType(_type);
  }, [typeId]);

  return (
    <CustomSelect
      instanceId="type"
      isClearable
      isDisabled={types.length === 0}
      options={types}
      placeholder={`Type`}
      value={type}
      onChange={(value) => {
        setType(value);
        router.push(
          value
            ? `/vehicles/${manId}/${modId}/${value.key}`
            : `/vehicles/${manId}/${modId}`
        );
      }}
    />
  );
};
