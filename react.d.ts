import { FC, PropsWithChildren } from "react";

declare module "react" {
  export declare type FCC<P = {}> = FC<PropsWithChildren<P>>;
}
