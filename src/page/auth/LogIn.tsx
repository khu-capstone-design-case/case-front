import { useState, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
// styles
import { Box, Divider } from "@mui/material";
import { ReactComponent as LogoText } from "/public/image/LogoText.svg";
import type { SxStyle } from "@app.types/app";
// constant
import { HOME_PATH, SIGN_UP_PATH } from "@constant/path";
// hooks
import { useLoginMutation } from "@app.hooks/auth";
import { useInternalRouter } from "@app.hooks/route";
// components
import AppTextField from "@app.component/atom/AppTextField";
import Spacer from "@app.component/atom/Spacer";
import AppText from "@app.component/atom/AppText";
import AppButton from "@app.component/atom/AppButton";

function LogInPage() {
  const router = useInternalRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync, isPending } = useLoginMutation();

  const login = async () => {
    if ([id, password].some((val) => val.trim() === "")) return;

    try {
      const res = await mutateAsync({ id, password });

      if ("accessToken" in res) {
        new Cookies().set("accessToken", res.accessToken);
        router.replace(HOME_PATH);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onKeyDown = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    await login();
  };

  return (
    <Box sx={styles.container}>
      <Spacer y={200} />
      <LogoText />
      <Spacer y={50} />

      <AppTextField
        value={id}
        placeholder="ID"
        onChange={({ target: { value } }) => setId(value)}
        sx={styles.input}
        onKeyDown={onKeyDown}
      />

      <Spacer y={20} />

      <AppTextField
        value={password}
        placeholder="PW"
        onChange={({ target: { value } }) => setPassword(value)}
        sx={styles.input}
        type="password"
        onKeyDown={onKeyDown}
      />

      <Spacer y={32} />

      <AppButton className="loginButton" onClick={login} loading={isPending}>
        LOG IN
      </AppButton>

      <Spacer y={22} />

      <Box className="helpArea">
        <Link className="helpText" to="/login">
          비밀번호를 잊으셨나요?
        </Link>
        <Divider className="divider" orientation="vertical" />
        <Link className="helpText" to={SIGN_UP_PATH}>
          회원가입
        </Link>
      </Box>
    </Box>
  );
}

export default LogInPage;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .loginButton": {
      width: "288px",
      height: "52px",
      py: "14px",
      fontSize: "20px",
      fontWeight: 600,
      borderRadius: "26px",
      letterSpacing: "-1px",
    },
    "& .helpArea": {
      display: "flex",
      alignItems: "center",
    },
    "& .helpText": {
      color: "#DEDEDE",
      fontSize: "12px",
      fontWeight: 600,
      letterSpacing: "-0.6px",
      textDecoration: "underline",
    },
    "& .divider": { height: "10px", mx: "9px" },
  },
  input: {
    width: "330px",
    "& input::placeholder": {
      color: "#888",
      fontSize: "20px",
      fontWeight: 600,
      letterSpacing: "-1px",
    },
  },
} satisfies SxStyle;
