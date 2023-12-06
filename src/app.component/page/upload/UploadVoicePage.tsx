import { useRef, memo, type RefObject } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import type Slider from "react-slick";
// styles
import { Box, Typography } from "@mui/material";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import CheckIcon from "@mui/icons-material/Check";
import type { SxStyle, uploadFormState } from "@app.type/app";
// lib
import { acceptableExt, checkAcceptable } from "@lib";
// components
import { ReactComponent as CharacterUpload } from "@asset/image/CharacterUpload.svg";
import AppButton from "@app.component/atom/AppButton";
import Spacer from "@app.component/atom/Spacer";

interface UploadVoicePageProps {
  sliderRef: RefObject<Slider>;
}

function UploadVoicePage({ sliderRef }: UploadVoicePageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { watch, control } = useFormContext<uploadFormState>();

  const file = watch("file");

  return (
    <Box sx={styles.container}>
      <Spacer y={50} />
      <CharacterUpload />
      <Spacer y={34} />

      <Typography className="mainText">
        상대가 어떤 마음인지 모르시겠다구요?
      </Typography>
      <Spacer y={8} />
      <Typography className="subText">
        사용자님의 대화를 뉘앙스 AI에게도 들려주세요! 대화 속에 꼭꼭 숨겨진
        상대의 감정을 함께 알아봐요!
      </Typography>

      <Spacer y={56} />

      <Box className="inputWrapper" onClick={() => inputRef.current?.click()}>
        {file ? (
          <CheckIcon fontSize="large" color="primary" />
        ) : (
          <KeyboardVoiceIcon fontSize="large" sx={{ fill: "#939393" }} />
        )}
        <Controller
          control={control}
          name="file"
          render={({ field: { onChange } }) => (
            <input
              type="file"
              accept="audio/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                if (checkAcceptable(file.name)) {
                  onChange(file);
                } else {
                  enqueueSnackbar(
                    `${acceptableExt.join(",")} 파일만 가능해요!`
                  );
                }
              }}
              ref={inputRef}
            />
          )}
        />
      </Box>

      <Spacer y={16} />

      <Typography className="uploadText">
        분석하고자 하는 음성 파일을 첨부해 주세요!
      </Typography>

      <Spacer y={32} />

      <AppButton
        className="nextButton"
        onClick={() => sliderRef.current?.slickNext()}
        disabled={!file}
      >
        다음
      </AppButton>
    </Box>
  );
}

export default memo(UploadVoicePage);

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    "& .uploadText": {
      color: "#ADADAD",
      fontSize: "12px",
      fontWeight: 600,
      letterSpacing: "-0.6px",
    },
    "& .inputWrapper": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "192px",
      height: "100px",
      bgcolor: "#fff",
      borderRadius: "8px",
      cursor: "pointer",
      boxShadow: 2,
    },
  },
} satisfies SxStyle;
