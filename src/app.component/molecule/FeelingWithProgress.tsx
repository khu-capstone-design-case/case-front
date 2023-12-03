import { Box, Typography } from "@mui/material";
// types
import type { SxStyle } from "@app.types/app";
// lib
import { getFeelingScore } from "@lib";
// components
import { ReactComponent as GoodSpeechBubble } from "/public/image/GoodSpeechBubble.svg";
import { ReactComponent as BadSpeechBubble } from "/public/image/BadSpeechBubble.svg";
import AppLinearProgress from "@app.component/atom/AppLinearProgress";

interface FeelingWithProgressProps {
  score: number;
}

export default function FeelingWithProgress({
  score,
}: FeelingWithProgressProps) {
  const result = getFeelingScore(score);

  const SpeechBubble =
    result.feeling === "good" ? GoodSpeechBubble : BadSpeechBubble;

  return (
    <Box sx={styles.container}>
      <SpeechBubble
        className="speechBubble"
        style={{ left: `calc(${score}% - ${score < 5 ? "19px" : "22px"})` }}
      />
      <AppLinearProgress
        className="progress"
        variant="determinate"
        value={score}
      />
      <Typography className="feelingText">{result.text}</Typography>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    flexDirection: "column",
    textAlign: "center",
    width: "100%",
    "& .speechBubble": {
      position: "absolute",
      top: 0,
    },
    "& .progress": {
      height: "8px",
      m: "55px 0 8px 0",
    },
    "& .feelingText": {
      color: "#888",
      fontSize: "12px",
      letterSpacing: "-0.6px",
    },
  },
} satisfies SxStyle;
