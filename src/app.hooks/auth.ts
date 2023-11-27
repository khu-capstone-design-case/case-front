import { useMutation } from "@tanstack/react-query";
// lib
import { API } from "../lib";
// end points
import { POST_LOGIN, POST_SIGN_UP } from "../app.endpoint";
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
    mutationFn: async (form: LoginRequestBody) =>
      await API.POST<LoginResponse, LoginRequestBody>(POST_LOGIN, form),
  });

export const useSignUpMutation = () =>
  useMutation({
    mutationKey: ["user/join"],
    mutationFn: async (form: signUpRequestBody) =>
      await API.POST<signUpResponse, signUpRequestBody>(POST_SIGN_UP, form),
  });
