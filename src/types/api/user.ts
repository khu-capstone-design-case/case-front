export interface Record {
  id: number;
  opponent: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface GetUserMainResponse {
  id: string;
  name: string;
  talker: Record[];
}
