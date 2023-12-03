export const GET_USER_MAIN = "/api/user/page" as const;
export const GET_RECORD_BY_OPPONENT = (opponent: string) =>
  `/api/user/page/talker?opponent=${opponent}` as const;
export const GET_RECORD_DETAIL = (id: number) =>
  `/api/user/page/record?id=${id}` as const;
export const POST_SCRIPT = "/api/script" as const;

export const DEL_RECORD_BY_OPPONENT = (opponent: string) =>
  `/api/user/page/talker?opponent=${opponent}` as const;
export const DEL_RECORD_DETAIL = (id: number) =>
  `/api/user/page/record?id=${id}` as const;
