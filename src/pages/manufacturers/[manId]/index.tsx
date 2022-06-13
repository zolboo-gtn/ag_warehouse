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
> = ({ manufacturers, models }) => {
  const {
    isFallback,
    query: { manId },
  } = useRouter();

  if (isFallback) {
    return (
      <div className="flex items-center justify-center bg-black/25">
        <Spinner />
      </div>
    );
  }

  const manufacturer = manufacturers.find(
    (manufacturer) => manufacturer.key === manId
  );
  return (
    <main className="h-full w-full overflow-y-auto p-2">
      <div className="flex flex-col gap-y-5">
        <h2>{manufacturer?.value}</h2>
        <div className="flex flex-col">
          {models.map(({ key, value }) => (
            <Link
              key={key}
              href={`/manufacturers/${manId}/models/${key}`}
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

ModelsPage.getLayout = (page, { manufacturers, models }: IProps) => {
  return (
    <SearchLayout manufacturers={manufacturers} models={models}>
      {page}
    </SearchLayout>
  );
};

export default ModelsPage;
