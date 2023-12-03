import { Box, Typography } from "@mui/material";
// types
import type { RecordMain } from "@app.types/api";
import type { SxStyle } from "@app.types/app";
// components
import Spacer from "@app.component/atom/Spacer";

interface OpponentCardDetailProps {
  record: RecordMain;
}

export default function OpponentCardDetail({
  record,
}: OpponentCardDetailProps) {
  const { positive, negative } = record;

  return (
    <Box sx={styles.container}>
      <Box className="card">
        <Typography className="cardTitle">호감도 점수</Typography>
        <Spacer y={10} />
        <Typography className="scoreTitle">positive</Typography>
        <Typography className="score">{positive}</Typography>
        <Typography className="scoreTitle">negative</Typography>
        <Typography className="score">{negative}</Typography>
      </Box>
      <Box className="card">
        <Typography className="cardTitle">호감도 점수</Typography>
        <Spacer y={10} />
        <Typography className="scoreTitle">positive</Typography>
        <Typography className="score">{positive}</Typography>
        <Typography className="scoreTitle">negative</Typography>
        <Typography className="score">{negative}</Typography>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    "& .card": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
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
