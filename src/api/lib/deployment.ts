import axios, { AxiosResponse } from "axios";
import { getDeploymentApiClient } from "../apiClient";

export class DeploymentError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const API_BASE_ENDPOINT = "/deploy";
const apiClient = getDeploymentApiClient();

const handleApiError = (error: unknown, defaultMessage: string): never => {
  const message = error instanceof Error ? error.message : defaultMessage;

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const detailedMessage = error.response?.data?.message || error.message;
    const data = error.response?.data;

    throw new DeploymentError(
      detailedMessage
        ? `${defaultMessage}: ${detailedMessage}`
        : defaultMessage,
      statusCode,
      data
    );
  }

  throw new DeploymentError(message, 500, {});
};

/**
 * Creates a new deployment
 * @returns Promise<AxiosResponse>
 */
export const createDeployment = async (): Promise<AxiosResponse> => {
  return apiClient
    .post(API_BASE_ENDPOINT)
    .catch((error) => handleApiError(error, "Failed to create deployment"));
};
