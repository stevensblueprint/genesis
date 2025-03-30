import axios, { AxiosResponse } from "axios";
import { getDeploymentInfoApiClient } from "../apiClient";

export class DeploymentInfoError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const API_BASE_ENDPOINT = "/deployments";
const apiClient = getDeploymentInfoApiClient();

const handleApiError = (error: unknown, defaultMessage: string): never => {
  const message = error instanceof Error ? error.message : defaultMessage;

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const detailedMessage = error.response?.data?.message || error.message;
    const data = error.response?.data;

    throw new DeploymentInfoError(
      detailedMessage
        ? `${defaultMessage}: ${detailedMessage}`
        : defaultMessage,
      statusCode,
      data
    );
  }

  throw new DeploymentInfoError(message, 500, {});
};

/**
 * Fetches deployment information
 * @returns Promise<AxiosResponse>
 */
export const fetchDeploymentInfo = async (): Promise<AxiosResponse> => {
  return apiClient
    .get(API_BASE_ENDPOINT)
    .catch((error) =>
      handleApiError(error, "Failed to fetch deployment information")
    );
};
