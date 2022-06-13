import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { CustomTable, Spinner, SearchLayout } from "common/components";
import { useGetVehicles } from "common/hooks";
import type {
  IVehicleManufacturer,
  IVehicleModel,
  IVehicleType,
} from "common/models";
import { useVehicleSearch } from "common/recoil";
import { TechDocRepository } from "common/services";

interface IProps {
  manufacturers: IVehicleManufacturer[];
  models: IVehicleModel[];
  types: IVehicleType[];
}
export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
  const repository = TechDocRepository.getInstance();

  // get manufacturers
  const manufacturers = await repository.getManufacturers();

  // get models by manufacturer id
  const manId = params?.manId;
  const models =
    typeof manId === "string" ? await repository.getModels(manId) : [];

  // get models by manufacturer id
  const modId = params?.modId;
  const types =
    typeof manId === "string" && typeof modId === "string"
      ? await repository.getTypes(manId, modId)
      : [];

  return {
    props: {
      manufacturers,
      models,
      types,
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
> = ({ types }) => {
  const {
    isFallback,
    query: { manId, modId },
  } = useRouter();

  if (!(typeof manId !== "string" && typeof modId !== "string")) {
    return null;
  }

  if (isFallback) {
    return <div>{`isFallback`}</div>;
  }

  return (
    <main className="h-full w-full overflow-y-auto">
      <div className="flex flex-col">
        {types.map(({ key, value }) => (
          <Link
            key={key}
            href={`/vehicles/${manId}/${modId}/${key}`}
            prefetch={false}
          >
            <a>{value}</a>
          </Link>
        ))}
      </div>
    </main>
  );
};

TypesPage.getLayout = (page, { manufacturers, models, types }: IProps) => {
  return (
    <SearchLayout manufacturers={manufacturers} models={models} types={types}>
      {page}
    </SearchLayout>
  );
};

export default TypesPage;
