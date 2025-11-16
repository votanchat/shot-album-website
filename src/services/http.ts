import { API_BASE_URL, API_HEADERS, API_VERSION } from "@/constans/common";
import { cleanParams } from "@/utils/common";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface ApiResponse<T> {
  data?: T;
  success: boolean;
}

export interface BaseRequestData {
  [key: string]: unknown;
}

export class HttpService {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor() {
    const baseUrl = API_BASE_URL;
    this.baseURL = baseUrl + "/" + API_VERSION.V1;

    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: API_HEADERS.COMMON,
      withCredentials: false,
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        return config;
      },
      async (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      async (response: AxiosResponse) => {
        return response.data;
      },
      async (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  public async get<
    TResponse,
    TRequest extends BaseRequestData = BaseRequestData
  >(
    url: string,
    params?: TRequest,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<TResponse>> {
    try {
      const cleanedParams = params ? cleanParams(params as object) : undefined;
      const response = (await this.instance.get(url, {
        params: cleanedParams,
        ...config,
      })) as ApiResponse<TResponse>;
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export const http = new HttpService();
