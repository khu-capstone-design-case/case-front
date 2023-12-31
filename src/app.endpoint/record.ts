import { queryWrapper } from "@lib";

export const GET_RECORD = "/api/record/opponent" as const;
export const GET_RECORD_FILE = (fileName: string) =>
  `/api/record/${fileName}` as const;
export const GET_OPPONENT_LIST = "/api/record/opponent" as const;
export const GET_PROGRESS = queryWrapper<{ id: number }>(
  "/api/record/upload/progress"
);

export const POST_RECORD = "/api/record/upload/init" as const;
export const POST_ANALYZE = "/api/record/upload/analyze" as const;
