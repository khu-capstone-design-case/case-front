import { useEffect } from "react";
import { useCookies } from "react-cookie";
// style
import { Container, type SxProps } from "@mui/material";
// constant
import { HOME_PATH, LOGIN_PATH, SIGN_UP_PATH } from "../constant/path";
// store
import { authStore } from "@app.store/authStore";

function Layout({ children }: { children: React.ReactNode }) {
  const [{ accessToken }] = useCookies(["accessToken"]);
  const { setToken } = authStore();

  useEffect(() => {
    const path = window.location.pathname;
    const unAuthorizedPath = path === LOGIN_PATH || path === SIGN_UP_PATH;

    if (accessToken) {
      setToken(accessToken);
      if (unAuthorizedPath) window.location.href = HOME_PATH;
    } else if (!unAuthorizedPath) {
      setToken("");
      window.location.replace(LOGIN_PATH);
    }
  }, [accessToken, setToken]);

  return (
    <Container fixed disableGutters maxWidth="xs" sx={layoutStyle}>
      {children}
    </Container>
  );
}

export default Layout;

const layoutStyle: SxProps = {
  position: "relative",
  height: "100vh",
  overflow: "hidden",
  bgcolor: "var(--color-background)",
  p: "20px",
};
