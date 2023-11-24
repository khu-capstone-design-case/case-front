import { useMutation } from "@tanstack/react-query";
// lib
import { API } from "../lib";
// end points
import { POST_RECORD } from "../app.endpoint";
// constant
import { HOME_PATH } from "../constant/path";
// types
import type { uploadRequestBody } from "../types/api";

export const useUploadMutation = () =>
  useMutation({
    mutationKey: ["record/upload"],
    mutationFn: async (body: uploadRequestBody) =>
      await API.POST<uploadRequestBody>(POST_RECORD, body, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => (window.location.href = HOME_PATH),
  });
