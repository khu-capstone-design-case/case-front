import { createBrowserRouter } from "react-router-dom";
import {
  HOME_PATH,
  LOGIN_PATH,
  SIGN_UP_PATH,
  UPLOAD_PATH,
} from "./constant/path";
import HomePage from "./page/home";
import LogInPage from "./page/auth/LogIn";
import SignUpPage from "./page/auth/SignUp";
import UploadPage from "@page/upload";

const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <HomePage />,
  },
  {
    path: SIGN_UP_PATH,
    element: <SignUpPage />,
  },
  {
    path: LOGIN_PATH,
    element: <LogInPage />,
  },
  {
    path: UPLOAD_PATH,
    element: <UploadPage />,
  },
]);

export default router;
