import type { AxiosError } from "axios";
import useSWR from "swr";

import type { IPair } from "common/models";
import { TechDocRepository } from "common/services";

export const useGetManufacturers = (keyword: string) => {
  const repository = TechDocRepository.getInstance();
  const key = `/getManufacturers${keyword ? `?${keyword}` : ""}`;

  const { data, error, mutate } = useSWR<IPair[], AxiosError>(key, () =>
    repository.getManufacturers()
  );

  return { data, error, mutate };
};
