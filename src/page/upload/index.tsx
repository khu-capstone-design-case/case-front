import { useRef } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
// styles
import { Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import CheckIcon from "@mui/icons-material/Check";
// types
import type { uploadFormState } from "../../types/app";
// components
import AppTextField from "@app.component/atom/AppTextField";
import Spacer from "@app.component/atom/Spacer";
import AppButton from "@app.component/atom/AppButton";
import { useUploadMutation } from "@app.hooks/upload";

export default function UploadPage() {
  const { register, handleSubmit, control, watch } = useForm<uploadFormState>({
    defaultValues: { speakerNum: 2 },
  });
  const file = watch("file");
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync, isPending } = useUploadMutation();

  const onSubmit: SubmitHandler<uploadFormState> = async (data) => {
    try {
      await mutateAsync(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.container}>
        <Link to="/">
          <ArrowBackIosIcon />
        </Link>

        <Spacer y={50} />

        <Box className="inputArea">
          <Typography>상대방</Typography>
          <AppTextField {...register("opponent")} />
          <Spacer y={20} />

          <Typography>통화 명</Typography>
          <AppTextField {...register("title")} />
          <Spacer y={20} />

          <Typography>통화자 수</Typography>
          <AppTextField {...register("speakerNum")} />
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
                accept="audio/*"
                hidden
                onChange={(e) => onChange(e.target.files?.[0])}
                ref={inputRef}
              />
            )}
          />
        </Box>

        <Spacer y={20} />

        <AppButton type="submit" sx={styles.button} loading={isPending}>
          업로드
        </AppButton>
      </Box>
    </form>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
    padding: "20px",
    "& .inputArea": {
      display: "flex",
      flexDirection: "column",
      "& input": { width: "100px" },
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
