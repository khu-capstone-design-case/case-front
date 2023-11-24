import { useQuery } from "@tanstack/react-query";
// lib
import { API } from "../lib";
// end points
import { GET_USER_MAIN } from "../app.endpoint";
// types
import type { GetUserMainResponse } from "../types/api";

export const useGetUserMain = () =>
  useQuery<GetUserMainResponse>({
    queryKey: ["user/page"],
    queryFn: async () => await API.GET<GetUserMainResponse>(GET_USER_MAIN),
  });
