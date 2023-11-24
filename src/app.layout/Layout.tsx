import { useEffect } from "react";
import { useCookies } from "react-cookie";
// style
import { Container, type SxProps } from "@mui/material";
// constant
import { LOGIN_PATH, SIGN_UP_PATH } from "../constant/path";
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
      if (unAuthorizedPath) window.location.href = "/";
    } else {
      if (!unAuthorizedPath) window.location.href = "/login";
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
  height: "100vh",
  overflow: "hidden",
  bgcolor: "var(--color-gray-30)",
  p: "20px",
};
