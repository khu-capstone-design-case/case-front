import Axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { authStore } from "../app.store/authStore";

const { VITE_API_BASE_URL } = import.meta.env;

const defaultConfig: AxiosRequestConfig = {
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
};

const requestInterceptor = (request: InternalAxiosRequestConfig) => {
  const { user } = authStore.getState();

  if (!request.headers["Authorization"] && user?.accessToken) {
    request.headers["Authorization"] = `Bearer ${user.accessToken}`;
  }
  return request;
};

const errorInterceptor = (error: AxiosError | Error) => {
  if (Axios.isAxiosError(error)) {
    const { message, config } = error;
    const { method, url } = config as AxiosRequestConfig;

    console.log(`⛔️ [API] ${method?.toUpperCase()} ${url}`);
    console.log(message);
  } else console.log(`⛔️ [API] Error ${error.message}`);
};

const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(requestInterceptor);
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    errorInterceptor
  );

  return instance;
};

export const axios = setInterceptor(Axios.create(defaultConfig));

export const API = {
  GET: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const { data } = await axios.get<T>(url, config);
    return data;
  },

  POST: async <T, D = unknown>(
    url: string,
    body: D,
    config?: AxiosRequestConfig<D>
  ) => {
    const { data } = await axios.post<T, AxiosResponse<T, D>, D>(
      url,
      body,
      config
    );
    return data;
  },

  DELETE: async <T>(url: string, config?: AxiosRequestConfig) => {
    const { data } = await axios.delete<T>(url, config);
    return data;
  },
};
