import { memo } from "react";
// styles
import { Box, Typography } from "@mui/material";
// types
import type { RecordMain } from "@app.types/api";
import type { SxStyle } from "@app.types/app";
import Spacer from "@app.component/atom/Spacer";
// lib
import { convertSeconds } from "@lib";

interface OpponentCardDetailProps {
  record: RecordMain;
}

function OpponentCardDetail({ record }: OpponentCardDetailProps) {
  const { length, positive, negative } = record;

  return (
    <Box sx={styles.container}>
      <Box className="card">
        <Typography className="cardTitle">총 통화시간</Typography>
        <Box marginBottom="20px">
          <Typography className="scoreText">WOW!</Typography>
          <Typography className="score">{convertSeconds(length)}</Typography>
          <Typography className="scoreText">동안 통화했어요.</Typography>
        </Box>
      </Box>
      <Box className="card">
        <Typography className="cardTitle">호감도 점수</Typography>
        <Box>
          <Spacer y={10} />
          <Typography className="scoreText">positive</Typography>
          <Typography className="score">{positive.toFixed(2)}</Typography>
          <Typography className="scoreText">negative</Typography>
          <Typography className="score">{negative.toFixed(2)}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(OpponentCardDetail);

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    "& .card": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      bgcolor: "#F3F3F3",
      borderRadius: "8px",
      width: "45%",
      p: "12px",
    },
    "& .cardTitle": {
      color: "#A8A8A8",
      fontSize: "16px",
      letterSpacing: "-0.8px",
      fontWeight: 500,
    },
    "& .scoreText": {
      color: "#525252",
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "16px",
      letterSpacing: "-0.36px",
    },
    "& .score": {
      color: "#393939",
      fontSize: "20px",
      fontWeight: 700,
      letterSpacing: "-1px",
    },
  },
} satisfies SxStyle;
