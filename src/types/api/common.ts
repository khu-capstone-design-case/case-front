export interface ErrorResponse {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: string;
}

export type AppResponse<T> = T | ErrorResponse;
