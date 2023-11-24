import { useMutation } from "@tanstack/react-query";
// store
import { authStore } from "../app.store/authStore";
// lib
import { API } from "../lib";
// end points
import { POST_LOGIN, POST_SIGN_UP } from "../app.endpoint";
// constant
import { HOME_PATH, LOGIN_PATH } from "../constant/path";
// types
import type {
  LoginRequestBody,
  LoginResponse,
  signUpRequestBody,
  signUpResponse,
} from "../types/api";

export const useLoginMutation = () =>
  useMutation({
    mutationKey: ["user/login"],
    mutationFn: async (form: LoginRequestBody) => {
      const { accessToken } = await API.POST<LoginResponse, LoginRequestBody>(
        POST_LOGIN,
        form
      );
      if (accessToken) {
        authStore.setState((prev) => ({ ...prev, accessToken }));
        document.cookie = `accessToken=${accessToken}`;
      }
    },
    onSuccess: () => (window.location.pathname = HOME_PATH),
  });

export const useSignUpMutation = () =>
  useMutation({
    mutationKey: ["user/join"],
    mutationFn: async (form: signUpRequestBody) =>
      await API.POST<signUpResponse, signUpRequestBody>(POST_SIGN_UP, form),
    onSuccess: () => (window.location.pathname = LOGIN_PATH),
  });
