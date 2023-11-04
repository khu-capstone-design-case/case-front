import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

const defaultConfig: AxiosRequestConfig = {
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
};

export const axios = Axios.create(defaultConfig);

export const API = {
  GET: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const { data } = await axios.get<T>(url, config);
    return data;
  },

  POST: async <T, D = unknown>(url: string, body: D, config?: AxiosRequestConfig<D>) => {
    const { data } = await axios.post<T, AxiosResponse<T, D>, D>(url, body, config);
    return data;
  },

  DELETE: async <T>(url: string, config?: AxiosRequestConfig) => {
    const { data } = await axios.delete<T>(url, config);
    return data;
  },
};
