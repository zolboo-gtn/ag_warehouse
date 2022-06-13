import "tailwindcss/tailwind.css";

import type { AppPropsWithLayout } from "next/app";
import type { FCC } from "react";
import { RecoilRoot } from "recoil";

const MyApp: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AppWrapper>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </AppWrapper>
  );
};

const AppWrapper: FCC = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default MyApp;
