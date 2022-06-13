import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from "next";
import Link from "next/link";

import { CustomTable, Spinner, SearchLayout } from "common/components";
import { useGetVehicles } from "common/hooks";
import type { IVehicleManufacturer } from "common/models";
import { useVehicleSearch } from "common/recoil";
import { TechDocRepository } from "common/services";

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
    <main className="h-full w-full overflow-y-auto">
      <div className="flex flex-col">
        {manufacturers.map(({ key, value }) => (
          <Link key={key} href={`/vehicles/${key}`} prefetch={false}>
            <a>{value}</a>
          </Link>
        ))}
      </div>
    </main>
  );
};
ManufacturersPage.getLayout = (page, { manufacturers }: IProps) => {
  return (
    <SearchLayout manufacturers={manufacturers} models={[]} types={[]}>
      {page}
    </SearchLayout>
  );
};

export default ManufacturersPage;
