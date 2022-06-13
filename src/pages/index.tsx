import type { GetStaticPaths, GetStaticProps, NextPageWithLayout } from "next";
import Link from "next/link";

import { CustomTable, MainLayout, Spinner } from "common/components";
import { useGetVehicles } from "common/hooks";
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
  const { data, error } = useGetVehicles(searchParams);

  if (error) {
    // TODO: error component
    return <div>{error.message}</div>;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center bg-black/25">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="h-full w-full overflow-y-auto">
      <CustomTable
        headers={[
          { key: "id", value: "id" },
          { key: "manufacturer", value: "manufacturer" },
          { key: "model", value: "model" },
          { key: "type", value: "type" },
        ]}
        rows={data.map(({ id, manufacturer, model, type }) => ({
          key: id,
          value: [
            <Link key={id} href="/">
              <a className="text-blue-400">{id}</a>
            </Link>,
            manufacturer,
            model,
            type,
          ],
        }))}
      />
    </main>
  );
};
DashboardPage.getLayout = (page) => {
  return <MainLayout>{page} </MainLayout>;
};

export default DashboardPage;
