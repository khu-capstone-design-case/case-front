export const GET_RECORD_BY_OPPONENT = (opponent: string) =>
  `/api/user/page/talker/${opponent}` as const;
export const GET_RECORD_DETAIL = (id: number) =>
  `/api/user/page/record/${id}` as const;

export const DEL_RECORD_BY_OPPONENT = (opponent: string) =>
  `/api/user/page/talker/${opponent}` as const;
export const DEL_RECORD_DETAIL = (room: number) =>
  `/api/user/record/${room}` as const;
