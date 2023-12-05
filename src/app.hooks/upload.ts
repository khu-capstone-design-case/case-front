import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// lib
import { API } from "@lib";
// end points
import { GET_OPPONENT_LIST, POST_RECORD, POST_ANALYZE } from "@app.endpoint";
// constant
import { HOME_PATH } from "@constant/path";
// types
import type {
  UploadResponse,
  UploadRequestBody,
  GetOpponentResponse,
} from "@app.types/api";

export const useGetOpponentList = () =>
  useQuery<GetOpponentResponse>({
    queryKey: ["record/opponent"],
    queryFn: async () => await API.GET<GetOpponentResponse>(GET_OPPONENT_LIST),
  });

export const useUploadInitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: UploadRequestBody) => {
      const res = await API.POST<UploadResponse, UploadRequestBody>(
        POST_RECORD,
        body,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (!(res && "error" in res)) {
        queryClient.invalidateQueries({ queryKey: ["user/page"] });
        window.location.href = HOME_PATH;
      }
    },
  });
};

export const useUploadAnalyzeMutation = () => {
  return useMutation({
    mutationFn: async () => await API.POST<UploadResponse>(POST_ANALYZE),
  });
};
