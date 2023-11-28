import { createBrowserRouter } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <HomePage />,
  },
  {
    path: LOGIN_PATH,
    element: <LogInPage />,
  },
  {
    path: SIGN_UP_PATH,
    element: <SignUpPage />,
  },
  {
    path: RECORD_OPPONENT_PATH,
    children: [
      { path: "", element: <OpponentPage /> },
      { path: `${RECORD_OPPONENT_PATH}/:id`, element: <DetailRecordPage /> },
    ],
  },
  {
    path: UPLOAD_PATH,
    element: <UploadPage />,
  },
]);

export default router;
