import { AppResponse } from "./common";
export interface RecordMain {
  id: number;
  opponent: string;
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

export type GetUserMainResponse = {
  id: string;
  name: string;
  talker: RecordMain[];
};

export type GetRecordByOpponent = {
  opponent: string;
  record: RecordOpponent[];
};

export type GetRecordDetail = {
  id: number;
  title: string;
  fileName: string;
  script: RecordDetail[];
};
