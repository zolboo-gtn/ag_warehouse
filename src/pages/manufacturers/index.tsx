import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from "next";
import Link from "next/link";

import {
  CustomTable,
  Spinner,
  SearchLayout,
  ManufacturerCard,
} from "common/components";
import type { IVehicleManufacturer } from "common/models";
import { TechDocRepository } from "common/services";
import { classNames } from "common/utils";

interface IProps {
  manufacturers: IVehicleManufacturer[];
}
export const getStaticProps: GetStaticProps<IProps> = async () => {
  const repository = TechDocRepository.getInstance();
  const manufacturers = await repository.getManufacturers();

  return {
    props: {
      manufacturers,
    },
    revalidate: 3600,
  };
};

const ManufacturersPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ manufacturers }) => {
  return (
    <main className="h-full w-full overflow-y-auto p-2">
      <div className="flex flex-col gap-y-5">
        <h2>{`Manufacturers`}</h2>
        <div
          className={classNames(
            "grid grid-cols-2 gap-5",
            "md:grid-cols-3",
            "lg:grid-cols-4"
          )}
        >
          {manufacturers.map(({ key, value }) => (
            <ManufacturerCard
              key={key}
              href={`/manufacturers/${key}`}
              label={value}
              prefetch={false}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
ManufacturersPage.getLayout = (page, { manufacturers }: IProps) => {
  return <SearchLayout manufacturers={manufacturers}>{page}</SearchLayout>;
};

export default ManufacturersPage;
