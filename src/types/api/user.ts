import { AppResponse } from "./common";
export interface Record {
  id: number;
  opponent: string;
  positive: number;
  neutral: number;
  negative: number;
}

export type GetUserMainResponse = AppResponse<{
  id: string;
  name: string;
  talker: Record[];
}>;
