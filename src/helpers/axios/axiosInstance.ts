import { authKey } from "@/constants/storageKey";
import { getNewAccessToken } from "@/service/auth.service";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getFromLocalStorage(authKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    const config = error?.config;
    if (error?.response?.status === 403 && !config.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const token = response?.data?.token;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        setToLocalStorage(authKey, token);
        console.log("access from instance", token);
        return instance(config);
      } else {
        console.error("Failed to refresh token. Logging out the user.");
        // Implement logout logic or redirect to login here
        return Promise.reject(error);
      }
    }

    console.log("err", error);
    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessages: error?.response?.data?.message,
    };
    return responseObject;
  }
);

export { instance };
