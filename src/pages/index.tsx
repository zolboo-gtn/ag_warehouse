import type { GetStaticPaths, GetStaticProps, NextPageWithLayout } from "next";
import Link from "next/link";

import { CustomTable, MainLayout, Spinner } from "common/components";

import { useVehicleSearch } from "common/recoil";
import { TechDocRepository } from "common/services";

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const repository = TechDocRepository.getInstance();
//   const manufacturers = await repository.getManufacturers(
//     typeof params?.keyword === "string" ? params.keyword : ""
//   );
//   return {
//     props: { manufacturers },
//     revalidate: 3600,
//   };
// };

const DashboardPage: NextPageWithLayout = () => {
  const { searchParams } = useVehicleSearch();

  return <main className="h-full w-full overflow-y-auto p-2"></main>;
};
DashboardPage.getLayout = (page) => {
  return <MainLayout>{page} </MainLayout>;
};

export default DashboardPage;
