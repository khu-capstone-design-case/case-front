import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// lib
import { API } from "@lib";
// end points
import { GET_OPPONENT_LIST, POST_RECORD, POST_ANALYZE } from "@app.endpoint";
// types
import type {
  UploadInitResponse,
  UploadInitRequestBody,
  UploadAnalyzeRequestBody,
  GetOpponentResponse,
} from "@app.type/api";

export const useGetOpponentList = () =>
  useQuery<GetOpponentResponse>({
    queryKey: ["record/opponent"],
    queryFn: async () => await API.GET<GetOpponentResponse>(GET_OPPONENT_LIST),
  });

export const useUploadInitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: UploadInitRequestBody) =>
      await API.POST<UploadInitResponse, UploadInitRequestBody>(
        POST_RECORD,
        body,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user/page"] });
    },
  });
};

export const useUploadAnalyzeMutation = () => {
  return useMutation({
    mutationFn: async (body: UploadAnalyzeRequestBody) =>
      await API.POST<null, UploadAnalyzeRequestBody>(POST_ANALYZE, body),
  });
};
