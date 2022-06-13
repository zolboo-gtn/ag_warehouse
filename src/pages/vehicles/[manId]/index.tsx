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
import type { IVehicleManufacturer, IVehicleModel } from "common/models";
import { useVehicleSearch } from "common/recoil";
import { TechDocRepository } from "common/services";

interface IProps {
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

  return {
    props: {
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
const ModelsPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ models }) => {
  const {
    isFallback,
    query: { manId },
  } = useRouter();

  if (typeof manId !== "string") {
    return null;
  }

  if (isFallback) {
    return <div>{`isFallback`}</div>;
  }
  return (
    <main className="h-full w-full overflow-y-auto">
      <div className="flex flex-col">
        {models.map(({ key, value }) => (
          <Link key={key} href={`/vehicles/${manId}/${key}`} prefetch={false}>
            <a>{value}</a>
          </Link>
        ))}
      </div>
    </main>
  );
};

ModelsPage.getLayout = (page, { manufacturers, models }: IProps) => {
  return (
    <SearchLayout manufacturers={manufacturers} models={models} types={[]}>
      {page}
    </SearchLayout>
  );
};

export default ModelsPage;
