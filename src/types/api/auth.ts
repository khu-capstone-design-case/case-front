import { AppResponse } from "./common";

export interface LoginRequestBody {
  id: string;
  password: string;
}

export type LoginResponse = AppResponse<{
  status: number;
  accessToken: string;
}>;

export interface signUpRequestBody extends LoginRequestBody {
  name: string;
}

export type signUpResponse = AppResponse<null>;
