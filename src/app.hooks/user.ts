import { useQuery } from "@tanstack/react-query";
// lib
import { API } from "../lib";
// end points
import {
  GET_RECORD_BY_OPPONENT,
  GET_RECORD_DETAIL,
  GET_USER_MAIN,
} from "../app.endpoint";
// types
import type {
  GetRecordByOpponent,
  GetRecordDetail,
  GetUserMainResponse,
} from "../types/api";

export const useGetUserMain = () =>
  useQuery<GetUserMainResponse>({
    queryKey: ["user/page"],
    queryFn: async () => await API.GET<GetUserMainResponse>(GET_USER_MAIN),
  });

export const useGetRecordByOpponent = (opponent?: string) =>
  useQuery<GetRecordByOpponent | undefined>({
    queryKey: ["user/page/talker", opponent],
    queryFn: async () => {
      if (opponent) {
        return await API.GET<GetRecordByOpponent>(
          GET_RECORD_BY_OPPONENT(opponent)
        );
      }
    },
  });

export const useGetRecordDetail = (id?: string) =>
  useQuery<GetRecordDetail | undefined>({
    queryKey: ["user/page/record", id],
    queryFn: async () => {
      if (id) {
        return await API.GET<GetRecordDetail>(GET_RECORD_DETAIL(Number(id)));
      }
    },
  });
