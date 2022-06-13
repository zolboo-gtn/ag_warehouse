import Image from "next/image";
import { PropsWithChildren } from "react";
import Select, { components } from "react-select";
import type { GroupBase, Props } from "react-select";

import { IPair } from "common/models";
import { classNames } from "common/utils";

export const CustomSelect = <
  Option extends IPair,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  getOptionLabel = (option) => `${option.value}`,
  getOptionValue = (option) => `${option.key}`,
  menuPlacement = "auto",
  ...props
}: PropsWithChildren<Props<Option, IsMulti, Group>>) => {
  return (
    <Select
      {...props}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      menuPlacement={menuPlacement}
    />
  );
};

export const CustomSelectWithImage = <
  Option extends IPair,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  image,
  menuPlacement = "auto",
  getOptionLabel = (option) => `${option.value}`,
  getOptionValue = (option) => `${option.key}`,
  ...props
}: PropsWithChildren<Props<Option, IsMulti, Group> & { image: string }>) => {
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
