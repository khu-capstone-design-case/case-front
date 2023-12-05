import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HOME_PATH,
  LOGIN_PATH,
  RECORD_OPPONENT_PATH,
  SIGN_UP_PATH,
  UPLOAD_PATH,
} from "./constant/path";
import HomePage from "./page/home";
import LogInPage from "./page/auth/LogIn";
import SignUpPage from "./page/auth/SignUp";
import UploadPage from "@page/upload";
import OpponentPage from "@page/opponent";
import DetailRecordPage from "@page/opponent/id";
import Layout from "@app.layout/Layout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={HOME_PATH} element={<HomePage />} />
          <Route path={LOGIN_PATH} element={<LogInPage />} />
          <Route path={SIGN_UP_PATH} element={<SignUpPage />} />
          <Route path={RECORD_OPPONENT_PATH}>
            <Route path="" element={<OpponentPage />} />
            <Route path=":id" element={<DetailRecordPage />} />
          </Route>

          <Route path={UPLOAD_PATH} element={<UploadPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
