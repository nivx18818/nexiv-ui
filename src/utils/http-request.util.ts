import axios, { AxiosError, type AxiosRequestConfig, type Method } from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

export type HttpResponse<T = unknown> = {
  data: T | null;
  error: { message: string; details: object | null } | null;
};

export type HttpMethodFn = <T = unknown>(
  url: string,
  data?: object,
  config?: AxiosRequestConfig,
) => Promise<HttpResponse<T>>;

const request = async <T = unknown>(
  method: Method,
  url: string,
  data?: object,
  config?: AxiosRequestConfig,
): Promise<HttpResponse<T>> => {
  try {
    const res = await httpRequest.request({
      method,
      url,
      data,
      ...config,
    });

    if (res.status == 204) {
      return { data: { success: true } as T, error: null };
    }

    return res.data;
  } catch (err) {
    const error = err as AxiosError<{
      message?: string;
      details?: object;
    }>;
    return {
      data: null,
      error: {
        message: error.response?.data?.message ?? error.message,
        details: error.response?.data?.details ?? null,
      },
    };
  }
};

const get: HttpMethodFn = (url, _, config) =>
  request("get", url, undefined, config);
const post: HttpMethodFn = (url, data, config) =>
  request("post", url, data, config);
const put: HttpMethodFn = (url, data, config) =>
  request("put", url, data, config);
const patch: HttpMethodFn = (url, data, config) =>
  request("patch", url, data, config);
const del: HttpMethodFn = (url, data, config) =>
  request("delete", url, data, config);

export default { get, post, put, patch, del };
