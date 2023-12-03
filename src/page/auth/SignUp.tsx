import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";
// constants
import { LOGIN_PATH } from "@constant/path";
// hooks
import { useSignUpMutation } from "@app.hooks/auth";
import { useInternalRouter } from "@app.hooks/route";
// components
import AppTextField from "@app.component/atom/AppTextField";
import Spacer from "@app.component/atom/Spacer";
import AppButton from "@app.component/atom/AppButton";
import PageWithGoBack from "@app.layout/PageWithGoBack";

interface signUpForm {
  id: string;
  password: string;
  name: string;
}

export default function SignUpPage() {
  const router = useInternalRouter();

  const [checkPs, setCheckPs] = useState("");
  const { formState, register, ...form } = useForm<signUpForm>({
    defaultValues: { id: "", password: "", name: "" },
  });

  const { mutateAsync, isPending } = useSignUpMutation();

  const signUp: SubmitHandler<signUpForm> = async (data) => {
    if (data.password !== checkPs) {
      enqueueSnackbar("비밀번호가 일치하지 않습니다.", { variant: "error" });
      return;
    }
    try {
      const res = await mutateAsync(data);

      if (!res?.error) {
        enqueueSnackbar("회원가입이 완료되었어요!", { variant: "success" });
        router.replace(LOGIN_PATH);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FormProvider formState={formState} register={register} {...form}>
      <PageWithGoBack>
        <form
          style={styles.form}
          onSubmit={(e) => {
            form.handleSubmit(signUp)();
            e.preventDefault();
            return false;
          }}
        >
          <Box sx={styles.container}>
            <Typography className="joinText">JOIN US</Typography>

            <AppTextField
              placeholder="사용할 아이디를 입력하세요!"
              sx={styles.input}
              {...register("id", { required: true })}
            />

            <Spacer y={20} />

            <AppTextField
              placeholder="비밀번호(영문, 숫자, 특수문자 포함)를 입력하세요!"
              {...register("password", { required: true })}
              sx={styles.input}
              type="password"
            />

            <Spacer y={20} />

            <AppTextField
              value={checkPs}
              onChange={({ target: { value } }) => setCheckPs(value)}
              placeholder="비밀번호를 재입력하세요!"
              sx={styles.input}
              type="password"
            />
            <Spacer y={20} />

            <AppTextField
              placeholder="사용자님의 이름을 입력하세요!"
              {...register("name", { required: true })}
              sx={styles.input}
            />

            <Spacer y={80} />

            <AppButton
              className="loginButton"
              type="submit"
              loading={isPending}
              disabled={!(formState.isValid && checkPs)}
            >
              등록하기
            </AppButton>
          </Box>
        </form>
      </PageWithGoBack>
    </FormProvider>
  );
}

const styles = {
  form: {
    width: "100%",
    height: "100%",
  },
  container: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    "& .joinText": {
      position: "absolute",
      top: 18,
      color: "#525252",
      fontSize: "20px",
      fontWeight: 600,
      letterSpacing: "-1px",
    },
    "& .loginButton": {
      width: "288px",
      height: "52px",
      py: "14px",
      fontSize: "20px",
      fontWeight: 600,
      borderRadius: "26px",
      letterSpacing: "-1px",
    },
  },
  input: {
    width: "330px",
    "& input::placeholder": {
      color: "#888",
      fontSize: "16px",
      fontWeight: 600,
      letterSpacing: "-0.8px",
    },
  },
} satisfies SxStyle;
