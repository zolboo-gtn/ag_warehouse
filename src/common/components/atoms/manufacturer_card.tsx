import Link, { LinkProps } from "next/link";
import type { FC } from "react";

interface IManufacturerCard extends LinkProps {
  label: string;
}
export const ManufacturerCard: FC<IManufacturerCard> = ({ href, label }) => {
  return (
    <Link href={href}>
      <a>
        <div className="flex h-full flex-col items-center gap-y-5 rounded-md border p-5">
          <div className="h-16 w-16 rounded-full bg-red-400" />
          <p className="text-center">{label}</p>
        </div>
      </a>
    </Link>
  );
};
