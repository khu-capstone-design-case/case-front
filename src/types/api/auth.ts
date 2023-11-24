export interface LoginRequestBody {
  id: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  accessToken: string;
}

export interface signUpRequestBody extends LoginRequestBody {
  name: string;
}

export interface signUpResponse extends Pick<LoginResponse, "status"> {}
