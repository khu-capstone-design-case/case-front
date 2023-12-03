import { useFormContext } from "react-hook-form";
// styles
import { Box, Typography } from "@mui/material";
import { uploadFormState, type SxStyle } from "@app.types/app";
// components
import AppTextField from "@app.component/atom/AppTextField";
import Spacer from "@app.component/atom/Spacer";
import AppButton from "@app.component/atom/AppButton";

interface UploadOpponentProps {
  isPending?: boolean;
}

export default function UploadOpponent({ isPending }: UploadOpponentProps) {
  const { register, watch } = useFormContext<uploadFormState>();

  const opponent = watch("opponent");
  const speakerNum = watch("speakerNum");

  return (
    <Box sx={styles.container}>
      <Spacer y={200} />

      <Typography className="mainText">
        대화 상대의 이름을 알려주세요!
      </Typography>

      <Spacer y={32} />
      <AppTextField
        className="input"
        placeholder="이름을 입력해 주세요!"
        {...register("opponent", { required: true })}
      />

      <Spacer y={32} />

      <Typography className="mainText">
        대화에 참여한 인원 수를 알려주세요!
      </Typography>

      <Spacer y={32} />
      <AppTextField
        className="input"
        placeholder="인원수를 입력해 주세요!"
        type="number"
        {...register("speakerNum", { required: true })}
      />

      <AppButton
        className="submitButton"
        type="submit"
        disabled={!(opponent && Boolean(Number(speakerNum)))}
        loading={isPending}
      >
        완료
      </AppButton>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    "& .submitButton": {
      position: "absolute",
      bottom: 50,
      width: "288px",
      height: "52px",
      borderRadius: "26px",
      fontSize: "20px",
      fontWeight: 600,
    },
  },
} satisfies SxStyle;
