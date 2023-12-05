// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";
// components
import AppLinearProgress from "@app.component/atom/AppLinearProgress";
import Spacer from "@app.component/atom/Spacer";

interface UploadProgressProps {
  seq: number;
}

export default function UploadProgress({ seq }: UploadProgressProps) {
  const getValue = () => {
    switch (seq) {
      case 0:
        return { progress: 0, text: "파일을 변환 중이에요!" };
      case 1:
        return { progress: 20, text: "음성을 분리 중이에요!" };
      case 2:
        return { progress: 40, text: "음성인식 중이에요!" };
      case 3:
        return { progress: 60, text: "감정을 분석 중이에요!" };
      case 4:
        return { progress: 80, text: "내용을 요약 중이에요!" };
      default:
        return { progress: 0, text: "" };
    }
  };

  return (
    <Box sx={styles.container}>
      <Typography className="text">{getValue().text}</Typography>
      <Spacer y={20} />
      <AppLinearProgress
        className="progress"
        value={getValue().progress}
        variant="determinate"
      />
      <Spacer y={10} />
      <Typography className="percentage">{getValue().progress}%</Typography>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    justifySelf: "center",
    "& .text": { color: "#535353", fontSize: "18px", fontWeight: 500 },
    "& .progress": { width: "100%", height: "10px" },
    "& .percentage": { color: "#525252" },
  },
} satisfies SxStyle;
