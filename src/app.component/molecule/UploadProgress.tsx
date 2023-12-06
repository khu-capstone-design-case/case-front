// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.type/app";
// lib
import { getProgressFromSeq } from "@lib";
// components
import AppLinearProgress from "@app.component/atom/AppLinearProgress";
import Spacer from "@app.component/atom/Spacer";

interface UploadProgressProps {
  seq: number;
}

export default function UploadProgress({ seq }: UploadProgressProps) {
  const { progress, text } = getProgressFromSeq(seq);

  return (
    <Box sx={styles.container}>
      <Typography className="text">{text}</Typography>
      <Spacer y={20} />
      <AppLinearProgress
        className="progress"
        value={progress}
        variant="determinate"
      />
      <Spacer y={10} />
      <Typography className="percentage">{progress}%</Typography>
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
