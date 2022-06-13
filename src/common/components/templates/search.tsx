import { Tab } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { FC, FCC, useEffect } from "react";

import {
  MainLayout,
  ManualSearchTab,
  VehicleIdentificationTab,
} from "common/components";
import type { IManualSearchTab } from "common/components";
import { classNames } from "common/utils";

interface ISearchLayout extends ISideBar {}
export const SearchLayout: FCC<ISearchLayout> = ({ children, ...rest }) => {
  return (
    <MainLayout>
      <div className="grid h-full w-full grid-cols-[250px,minmax(0,1fr)]">
        <SideBar {...rest} />
        {children}
      </div>
    </MainLayout>
  );
};

interface ISideBar extends IManualSearchTab {}
const SideBar: FC<ISideBar> = (props) => {
  return (
    <Tab.Group as="aside" className="h-full border-r">
      <Tab.List className="flex justify-between">
        {["Tab1", "Tab2"].map((tab) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              classNames(
                "flex w-full items-center justify-center bg-white py-2",
                !selected && "bg-gray-200"
              )
            }
          >
            <SearchIcon className="h-4 w-4" />
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <ManualSearchTab {...props} />
        </Tab.Panel>
        <Tab.Panel>
          <VehicleIdentificationTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
