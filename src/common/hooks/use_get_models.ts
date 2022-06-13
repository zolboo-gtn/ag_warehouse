import type { AxiosError } from "axios";
import useSWR from "swr";

import type { IPair } from "common/models";
import { TechDocRepository } from "common/services";

export const useGetModels = (
  manufacturerId: string | null,
  keyword: string
) => {
  const repository = TechDocRepository.getInstance();

  const params = new URLSearchParams();
  if (manufacturerId) {
    params.append("manufacturerId", manufacturerId);
  }
  if (keyword) {
    params.append("keyword", keyword);
  }
  const key = params.keys.length > 0 ? `/getModels?${params}` : null;

  const { data, error, mutate } = useSWR<IPair[], AxiosError>(key, () =>
    repository.getModels(manufacturerId!)
  );

  return { data, error, mutate };
};
