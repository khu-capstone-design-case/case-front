import { useState } from "react";
import { enqueueSnackbar } from "notistack";
// styles
import { Box } from "@mui/material";
import type { SxStyle } from "../../types/app/style";
// constants
import { LOGIN_PATH } from "@constant/path";
// hooks
import { useSignUpMutation } from "@app.hooks/auth";
import { useInternalRouter } from "@app.hooks/route";
// components
import AppTextField from "@app.component/atom/AppTextField";
import Spacer from "@app.component/atom/Spacer";
import AppText from "@app.component/atom/AppText";
import AppButton from "@app.component/atom/AppButton";
import PageLayout from "@app.layout/PageLayout";

function SignUpPage() {
  const router = useInternalRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { mutateAsync, isPending } = useSignUpMutation();

  const signUp = async () => {
    if ([id, password, name].some((val) => val.trim() === "")) {
      enqueueSnackbar("유효하지 않은 필드가 있습니다", { variant: "error" });
      return;
    }
    try {
      const res = await mutateAsync({ id, password, name });

      if (!res?.error) {
        enqueueSnackbar("회원가입이 완료되었어요!", { variant: "success" });
        router.replace(LOGIN_PATH);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PageLayout>
      <Box className="content" sx={styles.container}>
        <Box className="inputWrapper">
          <AppText>아이디</AppText>
          <AppTextField
            value={id}
            onChange={({ target: { value } }) => setId(value)}
            sx={styles.input}
          />
        </Box>

        <Spacer y={20} />

        <Box className="inputWrapper">
          <AppText>비밀번호</AppText>
          <AppTextField
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            sx={styles.input}
            type="password"
          />
        </Box>

        <Spacer y={20} />

        <Box className="inputWrapper">
          <AppText>이름</AppText>
          <AppTextField
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            sx={styles.input}
          />
        </Box>

        <Spacer y={80} />

        <Box className="buttonArea" onClick={signUp}>
          <AppButton sx={styles.button} loading={isPending}>
            회원가입
          </AppButton>
        </Box>
      </Box>
    </PageLayout>
  );
}

export default SignUpPage;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .inputWrapper": {
      display: "flex",
      flexDirection: "column",
      "& > p": {
        fontSize: "0.875rem",
        fontWeight: 600,
        p: "0 0 2px 5px",
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
} satisfies SxStyle;
