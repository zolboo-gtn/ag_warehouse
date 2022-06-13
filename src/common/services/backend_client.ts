import axios from "axios";
import type { AxiosRequestConfig, AxiosInstance } from "axios";

import { backend } from "config/default";

const config: AxiosRequestConfig = {
  baseURL: backend.baseUrl,
};

export class BackendClient {
  private static instance: AxiosInstance;
  private constructor() {}

  static getInstance(): AxiosInstance {
    if (!BackendClient.instance) {
      const _instance = axios.create(config);
      BackendClient.instance = _instance;
    }

    return BackendClient.instance;
  }
}
