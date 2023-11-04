import { createBrowserRouter } from "react-router-dom";
import { HOME_PATH, LOGIN_PATH, SIGN_UP_PATH } from "./constant/path";
import HomePage from "./page/home";
import LogInPage from "./page/auth/LogIn";
import SignUpPage from "./page/auth/SignUp";

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
]);

export default router;
