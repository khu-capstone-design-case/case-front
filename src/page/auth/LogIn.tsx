import { useState } from "react";
import { Link } from "react-router-dom";
// styles
import { Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
// constant
import { SIGN_UP_PATH } from "../../constant/path";
// hooks
import { useLoginMutation } from "@app.hooks/auth";
// components
import AppTextField from "@app.component/atom/AppTextField";
import Spacer from "@app.component/atom/Spacer";
import AppText from "@app.component/atom/AppText";
import AppButton from "@app.component/atom/AppButton";
import AppLogo from "@app.component/atom/Logo";

function LogInPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync, isPending } = useLoginMutation();

  const login = async () => {
    if ([id, password].some((val) => val.trim() === "")) return;

    try {
      await mutateAsync({ id, password });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={styles.container}>
      <Spacer y={20} />
      <AppLogo width={120} />
      <Spacer y={20} />

      <Box className="inputWrapper">
        <AppText>아이디</AppText>
        <AppTextField
          value={id}
          onChange={({ target: { value } }) => setId(value)}
          sx={styles.input}
          InputProps={{
            startAdornment: <PersonIcon fontSize="small" />,
          }}
        />
      </Box>

      <Spacer y={8} />

      <Box className="inputWrapper">
        <AppText>비밀번호</AppText>
        <AppTextField
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          sx={styles.input}
          InputProps={{
            startAdornment: <HttpsIcon fontSize="small" />,
          }}
          type="password"
        />
        <Link to={SIGN_UP_PATH}>회원가입</Link>
      </Box>

      <Spacer y={20} />

      <Box className="buttonArea">
        <AppButton sx={styles.button} onClick={login} loading={isPending}>
          로그인
        </AppButton>
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
    "& .inputWrapper": {
      display: "flex",
      flexDirection: "column",
      "& svg": { fill: "var(--color-gray-70)", mr: "10px" },
      "& > p": {
        fontSize: "0.875rem",
        fontWeight: 600,
        p: "0 0 2px 5px",
      },
      "& > a": {
        fontSize: "0.8rem",
        p: "5px 3px 0 0",
        color: "var(--color-gray-80)",
        fontWeight: 500,
        alignSelf: "flex-end",
      },
    },
    "& .buttonArea": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
  },
  input: { width: "350px" },
  button: { width: "350px", height: "52px", fontSize: "1rem", fontWeight: 600 },
};
