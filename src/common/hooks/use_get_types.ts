import type { AxiosError } from "axios";
import useSWR from "swr";

import type { IPair } from "common/models";
import { TechDocRepository } from "common/services";

export const useGetTypes = (
  manufacturerId: string | null,
  modelId: string | null,
  keyword: string
) => {
  const repository = TechDocRepository.getInstance();

  const params = new URLSearchParams();
  if (manufacturerId && modelId) {
    params.append("manufacturerId", manufacturerId);
    params.append("modelId", modelId);
  }
  if (keyword) {
    params.append("keyword", keyword);
  }
  const key = params.keys.length > 0 ? `/getTypes?${params}` : null;

  const { data, error, mutate } = useSWR<IPair[], AxiosError>(key, () =>
    repository.getTypes(manufacturerId!, modelId!)
  );

  return { data, error, mutate };
};
