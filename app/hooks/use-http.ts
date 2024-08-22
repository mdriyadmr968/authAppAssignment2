import { useCallback } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { StoreStateType } from "../misc/types";

type request = {
  method?: string | null;
  data?: object | null;
  url: string;
  headers?: Record<string, string | number | boolean>;
};

type callback = (data?: any) => void;

const useHttp = () => {
  const appCtx = useSelector((state: StoreStateType) => state.app);
  const defaultHeaders = {
    "X-App-Token": process.env.EXPO_PUBLIC_X_APP_TOKEN,
    "Content-Type": "application/json",
  };

  if (appCtx.authToken !== "") {
    defaultHeaders["X-Auth-Token"] = appCtx.authToken;
  }
  return useCallback(
    (
      requestOptions: request,
      successCallback?: callback,
      errorCallback?: callback,
      completeCallback?: callback
    ) =>
      axios({
        method: requestOptions.method
          ? requestOptions.method.toLowerCase()
          : "get",
        url: requestOptions.url,
        data: requestOptions.data ? requestOptions.data : null,
        headers: defaultHeaders,
      })
        .then((response: any) => {
          return Promise.resolve().then(
            () => successCallback && successCallback(response.data)
          );
        })
        .catch((error) => {
          return Promise.reject().then(
            () => errorCallback && errorCallback(error)
          );
        })
        .finally(() => {
          completeCallback && completeCallback();
        }),
    []
  );
};

export default useHttp;
