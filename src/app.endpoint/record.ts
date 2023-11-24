export const GET_RECORD = "/api/record/opponent" as const;
export const GET_RECORD_FILE = (fileName: string) =>
  `/api/record/${fileName}` as const;

export const POST_RECORD = "/api/record/upload" as const;
