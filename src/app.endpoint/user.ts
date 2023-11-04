export const GET_USER = "/api/user" as const;
export const GET_RECORD_BY_TALKER = (opponent: string) =>
  `/api/user/talker/${opponent}` as const;
export const GET_RECORD_DETAIL = (room: number) =>
  `/api/user/record/${room}` as const;

export const POST_LOGIN = "/api/user/login" as const;
export const POST_SIGN_UP = "/api/user/join" as const;
export const POST_LOGOUT = "/api/user/logout" as const;
export const POST_REFRESH_TOKEN = "/api/user/token" as const;

export const DEL_RECORD_BY_TALKER = (opponent: string) =>
  `/api/user/talker/${opponent}` as const;
export const DEL_RECORD_DETAIL = (room: number) =>
  `/api/user/record/${room}` as const;
