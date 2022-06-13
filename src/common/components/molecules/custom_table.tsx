import { useState } from "react";
import type { FC, ReactNode } from "react";

import { classNames } from "common/utils";

type TCell<T = ReactNode> = {
  key: string;
  value: T;
};
interface ICustomTable {
  rows: TCell<ReactNode[]>[];
  headers: TCell[];
}
export const CustomTable: React.FC<ICustomTable> = ({ rows, headers }) => {
  return (
    <table className="bg-white px-5">
      <thead>
        <tr
          className={classNames(
            "border-b",
            "child:py-5 child:pl-10 child:text-left"
          )}
        >
          {headers.map(({ key, value }) => (
            <th key={key}>{value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ key: rowKey, value }) => (
          <tr
            key={rowKey}
            className={classNames(
              "gap-y-5 border-b last:border-0",
              "child:py-5 child:pl-10"
            )}
          >
            {value.map((value, index) => (
              <td
                key={`${headers[index]?.key ?? `row-${index}`}-${rowKey}`}
                className="whitespace-nowrap"
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
