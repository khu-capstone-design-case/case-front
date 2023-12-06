import { useMutation } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
// store
import { authStore } from "@app.store/authStore";
// lib
import { API } from "@lib";
// end points
import { POST_LOGIN, POST_LOGOUT, POST_SIGN_UP } from "@app.endpoint";
// types
import {
  LogoutResponse,
  type LoginRequestBody,
  type LoginResponse,
  type signUpRequestBody,
  type signUpResponse,
} from "@app.type/api";

const cookie = new Cookies();

export const useLoginMutation = () =>
  useMutation({
    mutationKey: ["user/login"],
    mutationFn: async (form: LoginRequestBody) =>
      await API.POST<LoginResponse, LoginRequestBody>(POST_LOGIN, form),
  });

export const useSignUpMutation = () =>
  useMutation({
    mutationKey: ["user/join"],
    mutationFn: async (form: signUpRequestBody) =>
      await API.POST<signUpResponse, signUpRequestBody>(POST_SIGN_UP, form),
  });

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: async () => {
      await API.POST<LogoutResponse>(POST_LOGOUT);
      cookie.remove("accessToken");
      authStore.getState().setUser(null);
    },
  });
