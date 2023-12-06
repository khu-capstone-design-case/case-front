import { queryWrapper } from "@lib";

export const GET_USER_MAIN = "/api/user/page" as const;
export const GET_RECORD_BY_OPPONENT = queryWrapper<{ opponent: string }>(
  "/api/user/page/talker"
);
export const GET_RECORD_DETAIL = queryWrapper<{ id: number }>(
  "/api/user/page/record"
);
export const POST_SCRIPT = "/api/user/page/script" as const;

export const DEL_RECORD_BY_OPPONENT = queryWrapper<{ opponent: string }>(
  "/api/user/page/talker"
);
export const DEL_RECORD_DETAIL = queryWrapper<{ id: number }>(
  "/api/user/page/record"
);
