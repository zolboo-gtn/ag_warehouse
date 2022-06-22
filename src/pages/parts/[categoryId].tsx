import type { NextPageWithLayout } from "next";
import { useRouter } from "next/router";

import { MainLayout } from "common/components";

const PartCategoryPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { categoryId } = query;

  return (
    <main className="h-full w-full overflow-y-auto p-2">
      <div className="flex flex-col gap-y-5">{categoryId}</div>
    </main>
  );
};
PartCategoryPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default PartCategoryPage;
