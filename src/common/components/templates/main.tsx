import type { FCC } from "react";

import { Footer, Header } from "common/components";

export const MainLayout: FCC = ({ children }) => {
  return (
    <div className="grid h-screen w-screen grid-rows-[auto,minmax(0,1fr),auto]">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
