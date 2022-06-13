import Image from "next/image";
import { PropsWithChildren } from "react";
import Select, { components } from "react-select";
import type { GroupBase, Props } from "react-select";

import { IPair } from "common/models";
import { classNames } from "common/utils";

interface ICustomSelect<K, V>
  extends Props<IPair<K, V>, false, GroupBase<IPair<K, V>>> {}
export const CustomSelect = <K, V>({
  getOptionLabel = (option) => `${option.value}`,
  getOptionValue = (option) => `${option.key}`,
  menuPlacement = "auto",
  ...props
}: PropsWithChildren<ICustomSelect<K, V>>) => {
  return (
    <Select
      {...props}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      menuPlacement={menuPlacement}
    />
  );
};

export const CustomSelectWithImage = <K, V>({
  image,
  menuPlacement = "auto",
  getOptionLabel = (option) => `${option.value}`,
  getOptionValue = (option) => `${option.key}`,
  ...props
}: PropsWithChildren<ICustomSelect<K, V> & { image: string }>) => {
  return (
    <Select
      {...props}
      components={{
        Option: (props) => {
          return (
            <div className="relative flex items-center">
              <components.Option {...props} />
              <div className="absolute right-0 mr-2.5 h-8 w-16">
                <Image src={image} alt={`${props.data.key}`} layout="fill" />
              </div>
            </div>
          );
        },
      }}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      menuPlacement={menuPlacement}
    />
  );
};
