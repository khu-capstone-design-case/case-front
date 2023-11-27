import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
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
      const res = await API.POST<LoginResponse, LoginRequestBody>(
        POST_LOGIN,
        form
      );
      if ("error" in res) {
        enqueueSnackbar(res.message, { variant: "error" });
      } else {
        authStore.setState((prev) => ({
          ...prev,
          accessToken: res.accessToken,
        }));
        document.cookie = `accessToken=${res.accessToken}`;
        window.location.pathname = HOME_PATH;
      }
    },
  });

export const useSignUpMutation = () =>
  useMutation({
    mutationKey: ["user/join"],
    mutationFn: async (form: signUpRequestBody) => {
      const res = await API.POST<signUpResponse, signUpRequestBody>(
        POST_SIGN_UP,
        form
      );

      if (res && 400 <= res.status && res.status < 500 && res.message) {
        enqueueSnackbar(res.message, { variant: "error" });
      } else {
        enqueueSnackbar("회원가입이 완료되었어요!", { variant: "success" });
        window.location.pathname = LOGIN_PATH;
      }
    },
  });
