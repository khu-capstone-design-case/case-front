import { AppResponse } from "./common";

export interface UploadRequestBody {
  title: string;
  opponent: string;
  speakerNum: number;
  file: Blob;
}

export type UploadResponse = AppResponse<null>;

export type GetOpponentResponse = { opponent: string[] };
