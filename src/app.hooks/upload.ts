import { useMutation, useQueryClient } from "@tanstack/react-query";
// lib
import { API } from "@lib";
// end points
import { POST_RECORD } from "@app.endpoint";
// constant
import { HOME_PATH } from "@constant/path";
// types
import type { UploadResponse, UploadRequestBody } from "@app.types/api";

export const useUploadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["record/upload"],
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
