import axios, { AxiosRequestConfig } from "axios";

export const getDeploymentApiClient = () => {
  const apiClient = axios.create({
    baseURL: process.env.VITE_DEPLOYMENT_API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  } satisfies AxiosRequestConfig);
  return apiClient;
};

export const getDeploymentInfoApiClient = () => {
  const apiClient = axios.create({
    baseURL: process.env.VITE_DEPLOYMENT_INFO_API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  } satisfies AxiosRequestConfig);
  return apiClient;
};
