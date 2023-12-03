import Axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { Cookies } from "react-cookie";
import { enqueueSnackbar } from "notistack";
// store
import { authStore } from "@app.store/authStore";
// types
import type { UpdateTokenResponse } from "@app.types/api";
// constants
import { POST_REFRESH_TOKEN } from "@app.endpoint";

const { VITE_CLIENT_BASE_URL, VITE_API_BASE_URL } = import.meta.env;

const defaultConfig: AxiosRequestConfig = {
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
};

const requestInterceptor = async (request: InternalAxiosRequestConfig) => {
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");
  const { setUser } = authStore.getState();

  if (accessToken) {
    const Authorization = `Bearer ${accessToken}`;
    request.headers["Authorization"] = Authorization;
    try {
      const { data } = await Axios.post<UpdateTokenResponse>(
        `${VITE_API_BASE_URL}${POST_REFRESH_TOKEN}`,
        {},
        { headers: { Authorization }, withCredentials: true }
      );
      if (!("error" in data) && "accessToken" in data) {
        cookie.set("accessToken", data.accessToken, {
          domain: VITE_CLIENT_BASE_URL,
          path: "/",
        });
        setUser(data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return request;
};

const errorInterceptor = (error: AxiosError | Error) => {
  if (Axios.isAxiosError(error)) {
    const { message, config, response } = error;
    const { method, url } = config as AxiosRequestConfig;

    console.log(`⛔️ [API] ${method?.toUpperCase()} ${url}`);
    console.log(message);

    if (response?.status === 401) {
      enqueueSnackbar("로그인이 만료되었어요.");
      document.cookie = "accessToken=null;";
    }
    if (response && "error" in response.data) {
      const { data } = response;

      if ("error" in data && "message" in data && "error") {
        enqueueSnackbar(data.message, { variant: "error" });
      }
    }
    return response;
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
    body?: D,
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
