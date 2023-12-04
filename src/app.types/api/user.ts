import { Feeling } from "@app.types/app";
import { AppResponse } from "./common";
export interface RecordMain {
  id: number;
  opponent: string;
  length: number;
  point: number;
  positive: number;
  neutral: number;
  negative: number;
}

export interface RecordOpponent {
  id: number;
  title: string;
  summary: string;
  timestamp: number;
  length: number;
  point: number;
  positive: number;
  neutral: number;
  negative: number;
}

export interface RecordDetail {
  seq: number;
  speaker: string;
  message: string;
  startTime: number;
  endTime: number;
  positive: number;
  neutral: number;
  negative: number;
}

export type GetUserMainResponse = AppResponse<{
  id: string;
  name: string;
  talker: RecordMain[];
}>;

export type GetRecordByOpponent = AppResponse<{
  opponent: string;
  record: RecordOpponent[];
}>;

export type GetRecordDetail = AppResponse<{
  id: number;
  title: string;
  fileName: string;
  script: RecordDetail[];
}>;

export type DelRecordDetail = AppResponse<null>;
export type DelRecordByOpponent = AppResponse<null>;
export type PostScriptResponse = Feeling;
export type PostScriptBody = { script: string[] };
