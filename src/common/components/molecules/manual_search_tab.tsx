import { XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { FC, FormEvent } from "react";

import { CustomSelect } from "common/components";
import type {
  IVehicleEngine,
  IVehicleManufacturer,
  IVehicleModel,
} from "common/models";
import { useVehicleSearch } from "common/recoil";
import { classNames } from "common/utils";

export interface IManualSearchTab
  extends IManufacturerSelect,
    IModelSelect,
    IEngineSelect {}
export const ManualSearchTab: FC<IManualSearchTab> = ({
  engines,
  manufacturers,
  models,
}) => {
  const router = useRouter();
  const { reset } = useVehicleSearch();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form className="flex flex-col gap-y-2 p-2" onSubmit={onSubmit}>
      <h5>{`Manual Search`}</h5>
      <ManufacturerSelect manufacturers={manufacturers} />
      <ModelSelect models={models} />
      <EngineSelect engines={engines} />
      <div className="mt-2 flex gap-x-2">
        <button
          type="button"
          className={classNames(
            "flex h-10 w-full items-center justify-center rounded-md bg-red-400 duration-200",
            "disabled:opacity-40"
          )}
          onClick={async () => {
            await router.push("/manufacturers");
            reset();
          }}
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
  manufacturers?: IVehicleManufacturer[];
}
const ManufacturerSelect: FC<IManufacturerSelect> = ({
  manufacturers = [],
}) => {
  const router = useRouter();
  const { manId } = router.query;
  const { manufacturer, setEngine, setManufacturer, setModel } =
    useVehicleSearch();

  // set initial value
  useEffect(() => {
    if (router.isReady && typeof manId === "string") {
      const _manufacturer =
        manufacturers.find((manufacturer) => manufacturer.key === manId) ??
        null;
      setManufacturer(_manufacturer);
    }
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
          setEngine(null);
        }
        setManufacturer(value);
        router.push(value ? `/manufacturers/${value.key}` : "/manufacturers");
      }}
    />
  );
};

export interface IModelSelect {
  models?: IVehicleModel[];
}
const ModelSelect: FC<IModelSelect> = ({ models = [] }) => {
  const router = useRouter();
  const { manId, modId } = router.query;

  const { model, setEngine, setModel } = useVehicleSearch();

  // set initial value
  useEffect(() => {
    if (router.isReady && typeof modId === "string") {
      const _model = models.find((model) => model.key === modId) ?? null;
      setModel(_model);
    }
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
          setEngine(null);
        }
        setModel(value);
        router.push(
          value
            ? `/manufacturers/${manId}/models/${value.key}`
            : `/manufacturers/${manId}`
        );
      }}
    />
  );
};

export interface IEngineSelect {
  engines?: IVehicleEngine[];
}
const EngineSelect: FC<IEngineSelect> = ({ engines = [] }) => {
  const router = useRouter();
  const { engineId, manId, modId } = router.query;

  const { engine, setEngine } = useVehicleSearch();

  // set initial value
  useEffect(() => {
    if (router.isReady && typeof engineId === "string") {
      const _engine = engines.find((engine) => engine.key === engineId) ?? null;
      setEngine(_engine);
    }
  }, [engineId]);

  return (
    <CustomSelect
      instanceId="engine"
      isClearable
      isDisabled={engines.length === 0}
      options={engines}
      placeholder={`Engine`}
      value={engine}
      onChange={(value) => {
        setEngine(value);
        router.push(
          value
            ? `/manufacturers/${manId}/models/${modId}/engines/${value.key}`
            : `/manufacturers/${manId}/models/${modId}`
        );
      }}
    />
  );
};
