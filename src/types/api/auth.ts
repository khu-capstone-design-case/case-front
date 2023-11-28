import { AppResponse } from "./common";

export interface LoginRequestBody {
  id: string;
  password: string;
}

export type LoginResponse = AppResponse<{
  id: string;
  accessToken: string;
}>;

export interface signUpRequestBody extends LoginRequestBody {
  name: string;
}

export type signUpResponse = AppResponse<null>;

export type UpdateTokenResponse = LoginResponse;

export type LogoutResponse = AppResponse<null>;
