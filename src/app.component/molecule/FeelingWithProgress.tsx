import { Box, Typography, LinearProgress } from "@mui/material";
// types
import type { Feeling, SxStyle } from "@app.types/app";
// lib
import { getFeelingScore } from "@lib";
// components
import { ReactComponent as GoodSpeechBubble } from "/public/image/GoodSpeechBubble.svg";
import { ReactComponent as BadSpeechBubble } from "/public/image/BadSpeechBubble.svg";

interface FeelingWithProgressProps {
  feeling: Feeling;
}

export default function FeelingWithProgress({
  feeling,
}: FeelingWithProgressProps) {
  const result = getFeelingScore(feeling);

  const SpeechBubble =
    result.feeling === "good" ? GoodSpeechBubble : BadSpeechBubble;

  return (
    <Box sx={styles.container}>
      <SpeechBubble
        className="speechBubble"
        style={{ left: `calc(${result.score}% - 22px)` }}
      />
      <LinearProgress
        className="progress"
        variant="determinate"
        value={result.score}
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
      borderRadius: "8px",
    },
    "& .feelingText": {
      color: "#888",
      fontSize: "12px",
      letterSpacing: "-0.6px",
    },
  },
} satisfies SxStyle;
