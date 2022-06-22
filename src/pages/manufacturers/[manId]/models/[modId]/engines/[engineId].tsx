import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { Spinner, SearchLayout } from "common/components";
import type {
  IPartCategory,
  IVehicle,
  IVehicleEngine,
  IVehicleManufacturer,
  IVehicleModel,
} from "common/models";
import { TechDocRepository } from "common/services";
import { classNames } from "common/utils";

interface IProps {
  categories: IPartCategory[];
  engines: IVehicleEngine[];
  manufacturers: IVehicleManufacturer[];
  models: IVehicleModel[];
  vehicle: IVehicle;
}
export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
  const repository = TechDocRepository.getInstance();

  // get manufacturers
  const manufacturers = await repository.getManufacturers();

  // get models by manufacturer id
  const manId = params?.manId;
  const models =
    typeof manId === "string" ? await repository.getModels(manId) : [];

  // get types by model id
  const modId = params?.modId;
  const engines =
    typeof manId === "string" && typeof modId === "string"
      ? await repository.getEngines(manId, modId)
      : [];

  //  get vehicle by engine id
  const engineId = params?.engineId;
  const vehicle =
    typeof engineId === "string" ? await repository.getVehicle(engineId) : null;
  if (!vehicle) {
    return { notFound: true };
  }

  // get part categories
  const categories = await repository.getPartCategories();

  return {
    props: {
      categories,
      engines,
      manufacturers,
      models,
      vehicle,
    },
    revalidate: 3600,
  };
};
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
const VehiclePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ categories, vehicle }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <div className="flex items-center justify-center bg-black/25">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="h-full w-full overflow-y-auto p-2">
      <div className="flex flex-col">
        {/* vehicle */}
        {/* {Object.entries(vehicle).map(([key, value]) => (
          <div key={key}>{`${key}: ${value}`}</div>
        ))} */}
        {/* part categories */}
        <ul>
          {categories.map(({ children, id, name }) => (
            <li key={id} className="flex flex-col items-start">
              <Disclosure>
                <div className="flex items-start gap-x-2 px-2">
                  {/* parent */}
                  <Link href={`/parts/${id}`}>
                    <a className={classNames("font-bold", "hover:underline")}>
                      {name}
                    </a>
                  </Link>
                  <Disclosure.Button className="bg-gray-300">
                    <ChevronDownIcon className="h-5 w-5" />
                  </Disclosure.Button>
                </div>
                {/* children */}
                <Disclosure.Panel>
                  <ul className="pl-5">
                    {children.map(({ id, name }) => (
                      <li key={id}>
                        <Link href={`/parts/${id}`}>
                          <a className={classNames("hover:underline")}>
                            {name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Disclosure.Panel>
              </Disclosure>
            </li>
          ))}
        </ul>
        {/* <ul>
          {categories.map(({ children, id, name }) => (
            <li key={id}>
              <Link href="/">
                <a className="font-bold">{name}</a>
              </Link>
              <ul className="pl-5">
                {children.map(({ id, name }) => (
                  <li key={id}>
                    <Link href="/">
                      <a>{name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul> */}
      </div>
    </main>
  );
};

VehiclePage.getLayout = (page, { engines, manufacturers, models }: IProps) => {
  return (
    <SearchLayout
      engines={engines}
      manufacturers={manufacturers}
      models={models}
    >
      {page}
    </SearchLayout>
  );
};

export default VehiclePage;
