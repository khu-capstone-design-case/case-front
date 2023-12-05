export interface UploadInitRequestBody {
  title: string;
  opponent: string;
  speakerNum: number;
  file: Blob;
}

export type UploadInitResponse = {
  recordId: number;
  talkerId: number;
  fileName: string;
  userId: string;
  speakerNum: number;
};

export type UploadAnalyzeRequestBody = {
  recordId: number;
  talkerId: number;
  fileName: string;
  userId: string;
  speakerNum: number;
};

export type GetOpponentResponse = { opponent: string[] };
