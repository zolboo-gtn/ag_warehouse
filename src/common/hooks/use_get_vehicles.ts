import { AxiosError } from "axios";
import useSWR from "swr";

import type { IVehicle } from "common/models";
import { TechDocRepository } from "common/services";

export const useGetVehicles = (query: URLSearchParams) => {
  const repository = TechDocRepository.getInstance();
  const key = `/getVehicles?${query}`;

  const { data, error, mutate } = useSWR<IVehicle[], AxiosError>(key, () =>
    repository.getVehicles(query)
  );

  return { data, error, mutate };
};
