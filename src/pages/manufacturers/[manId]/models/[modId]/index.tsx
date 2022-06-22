import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { Spinner, SearchLayout } from "common/components";
import type {
  IVehicleEngine,
  IVehicleManufacturer,
  IVehicleModel,
} from "common/models";
import { useVehicleSearch } from "common/recoil";
import { TechDocRepository } from "common/services";

interface IProps {
  engines: IVehicleEngine[];
  manufacturers: IVehicleManufacturer[];
  models: IVehicleModel[];
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

  return {
    props: {
      engines,
      manufacturers,
      models,
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
const TypesPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ engines, models }) => {
  const {
    isFallback,
    query: { manId, modId },
  } = useRouter();

  if (isFallback) {
    return (
      <div className="flex items-center justify-center bg-black/25">
        <Spinner />
      </div>
    );
  }

  const model = models.find((model) => model.key === modId);
  return (
    <main className="h-full w-full overflow-y-auto p-2">
      <div className="flex flex-col gap-y-5">
        <h2>{model?.value}</h2>
        <div className="flex flex-col">
          {engines.map(({ key, value }) => (
            <Link
              key={key}
              href={`/manufacturers/${manId}/models/${modId}/types/${key}`}
              prefetch={false}
            >
              <a>{value}</a>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

TypesPage.getLayout = (page, { engines, manufacturers, models }: IProps) => {
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

export default TypesPage;
