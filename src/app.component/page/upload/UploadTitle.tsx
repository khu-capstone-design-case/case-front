import { memo, type RefObject } from "react";
import type Slider from "react-slick";
import { useFormContext } from "react-hook-form";
// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle, uploadFormState } from "@app.types/app";
// components
import AppTextField from "@app.component/atom/AppTextField";
import Spacer from "@app.component/atom/Spacer";
import AppButton from "@app.component/atom/AppButton";

interface UploadTitleProps {
  sliderRef: RefObject<Slider>;
}

function UploadTitle({ sliderRef }: UploadTitleProps) {
  const { register, watch } = useFormContext<uploadFormState>();

  const title = watch("title");

  return (
    <Box sx={styles.container}>
      <Spacer y={200} />

      <Typography className="mainText">
        상대와의 대화를 한 단어, 한 문장으로 요약한다면 어떻게 쓰실 건가요?
      </Typography>
      <Spacer y={10} />
      <Typography className="subText">
        나눴던 대화 중에 기억에 남는 이야기나 단어를 제목으로 설정하면 사용자님
        파일을 빠르게 찾을 수 있을거에요!
      </Typography>

      <Spacer y={32} />

      <AppTextField
        className="input"
        placeholder="제목을 입력해 주세요!"
        {...register("title", { required: true })}
      />
      <AppButton
        className="nextButton"
        onClick={() => sliderRef.current?.slickNext()}
        disabled={!title.trim()}
      >
        다음
      </AppButton>
    </Box>
  );
}

export default memo(UploadTitle);

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
} satisfies SxStyle;
