import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
// styles
import { Box, Typography } from "@mui/material";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import CheckIcon from "@mui/icons-material/Check";
// hooks
import { useUploadMutation } from "@app.hooks/upload";
// types
import type { uploadFormState } from "../../types/app";
// components
import AppTextField from "@app.component/atom/AppTextField";
import Spacer from "@app.component/atom/Spacer";
import AppButton from "@app.component/atom/AppButton";
import PageLayout from "@app.layout/PageLayout";

export default function UploadPage() {
  const { state } = useLocation();
  const { register, handleSubmit, control, watch } = useForm<uploadFormState>({
    defaultValues: { opponent: state?.opponent ?? "", speakerNum: 2 },
  });
  const file = watch("file");
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync, isPending } = useUploadMutation();

  const onSubmit: SubmitHandler<uploadFormState> = async (data) => {
    if (!file) return;

    try {
      await mutateAsync(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PageLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.container}>
          <Box className="inputArea">
            <Typography>상대방</Typography>
            <AppTextField {...register("opponent", { required: true })} />
            <Spacer y={20} />

            <Typography>통화 명</Typography>
            <AppTextField {...register("title", { required: true })} />
            <Spacer y={20} />

            <Typography>통화자 수</Typography>
            <AppTextField {...register("speakerNum", { required: true })} />
            <Spacer y={20} />

            <Box className="voice-icon-area">
              <Box
                className="voice-icon-wrapper"
                onClick={() => inputRef.current?.click()}
              >
                {file ? (
                  <CheckIcon fontSize="large" color="primary" />
                ) : (
                  <KeyboardVoiceIcon fontSize="large" />
                )}{" "}
              </Box>
            </Box>

            <Controller
              control={control}
              name="file"
              render={({ field: { onChange } }) => (
                <input
                  type="file"
                  accept="audio/mp3"
                  hidden
                  onChange={(e) => onChange(e.target.files?.[0])}
                  ref={inputRef}
                />
              )}
            />
          </Box>

          <Spacer y={50} />

          <AppButton type="submit" sx={styles.button} loading={isPending}>
            업로드
          </AppButton>
        </Box>
      </form>
    </PageLayout>
  );
}

const styles = {
  container: {
    "& .inputArea": {
      display: "flex",
      flexDirection: "column",
    },
    "& .voice-icon-area": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    "& .voice-icon-wrapper": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100px",
      height: "100px",
      bgcolor: "#fff",
      borderRadius: "999px",
      cursor: "pointer",
    },
  },
  button: {
    width: "100%",
    height: "50px",
  },
};
