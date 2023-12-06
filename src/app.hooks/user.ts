import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// lib
import { API } from "@lib";
// end points
import {
  DEL_RECORD_BY_OPPONENT,
  DEL_RECORD_DETAIL,
  GET_RECORD_BY_OPPONENT,
  GET_RECORD_DETAIL,
  GET_USER_MAIN,
  POST_SCRIPT,
} from "@app.endpoint";
// types
import type {
  GetUserMainResponse,
  GetRecordByOpponent,
  GetRecordDetail,
  DelRecordDetail,
  DelRecordByOpponent,
  PostScriptResponse,
  PostScriptBody,
} from "@app.types/api";

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

export const useGetRecordDetail = (id: number) =>
  useQuery<GetRecordDetail | undefined>({
    queryKey: ["user/page/record", id],
    queryFn: async () => await API.GET<GetRecordDetail>(GET_RECORD_DETAIL(id)),
  });

export const DeleteRecordDetailMutation = (opponent: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) =>
      await API.DELETE<DelRecordDetail>(DEL_RECORD_DETAIL(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user/page/talker", opponent],
      });
    },
  });
};

export const DeleteRecordByOpponentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (opponent: string) =>
      await API.DELETE<DelRecordByOpponent>(DEL_RECORD_BY_OPPONENT(opponent)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user/page"] });
    },
  });
};

export const useScriptAnalysisMutation = () =>
  useMutation({
    mutationFn: async (seqList: PostScriptBody) =>
      await API.POST<PostScriptResponse, PostScriptBody>(POST_SCRIPT, seqList),
  });
