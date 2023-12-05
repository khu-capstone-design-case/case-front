// import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { useCookies } from "react-cookie";
// style
import { Container, type SxProps } from "@mui/material";
// hooks
// import { useInternalRouter } from "@app.hooks/route";
// import { useLogoutMutation } from "@app.hooks/auth";
// // constant
// import { HOME_PATH, LOGIN_PATH, SIGN_UP_PATH } from "@constant/path";
// // store
// import { authStore } from "@app.store/authStore";

function Layout() {
  // const router = useInternalRouter();
  // const [{ accessToken }] = useCookies(["accessToken"]);
  // const { setToken } = authStore();
  // const { mutateAsync: logout } = useLogoutMutation();

  // useEffect(() => {
  //   const path = window.location.pathname;
  //   const unAuthorizedPath = path === LOGIN_PATH || path === SIGN_UP_PATH;

  //   if (accessToken) {
  //     setToken(accessToken);
  //     if (unAuthorizedPath) router.replace(HOME_PATH);
  //   } else if (!unAuthorizedPath) {
  //     logout();
  //     router.replace(LOGIN_PATH);
  //   }
  // }, [accessToken, setToken, router, logout]);

  return (
    <Container fixed disableGutters maxWidth="xs" sx={layoutStyle}>
      <Outlet />
    </Container>
  );
}

export default Layout;

const layoutStyle: SxProps = {
  position: "relative",
  height: "100vh",
  overflow: "hidden",
  bgcolor: "var(--color-background)",
  p: "25px",
};
