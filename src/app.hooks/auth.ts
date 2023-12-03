import { useMutation } from "@tanstack/react-query";
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
} from "@app.types/api";

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
    mutationFn: async () => await API.POST<LogoutResponse>(POST_LOGOUT),
  });
