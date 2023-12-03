import { Link } from "react-router-dom";
import dayjs from "dayjs";
// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";
import type { RecordOpponent } from "@app.types/api";
// lib
import { getFeelingScore } from "@lib";
// components
import RecordInfoProgress from "@app.component/molecule/RecordInfoProgress";
import Spacer from "@app.component/atom/Spacer";

interface RecordCardProps {
  opponent: string;
  record: RecordOpponent;
}
export default function RecordCard({ opponent, record }: RecordCardProps) {
  const { id, title, timestamp, positive, neutral, negative } = record;

  const result = getFeelingScore({ positive, neutral, negative });
  return (
    <Box sx={styles.container}>
      <Link to={`/${opponent}/${id}`} className="titleArea">
        <Typography className="title">{title}</Typography>
        <Typography className="date">
          {dayjs(timestamp).format("YYYY-MM-DD")}
        </Typography>
      </Link>

      <Spacer y={17} />

      <RecordInfoProgress
        title="통화시간"
        chipText="45m32s"
        value={result.score}
        minValueText="0h"
        maxValueText="1h"
      />

      <Spacer y={12} />

      <RecordInfoProgress
        title="호감도 점수"
        chipText={result.feeling}
        value={result.score}
        minValueText="Positive"
        maxValueText="Negative"
      />
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "95%",
    bgcolor: "#fff",
    height: "200px",
    borderRadius: "8px",
    p: "20px",
    boxShadow: 1,
    cursor: "pointer",
    "& .titleArea": {
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      "& .title": {
        color: "#525252",
        fontSize: "24px",
        fontWeight: 600,
        letterSpacing: "-1.2px",
      },
      "& .date": {
        color: "#505050",
        fontSize: "16px",
        fontWeight: 500,
        letterSpacing: "-0.8px",
      },
    },
    "& .infoArea": {},
  },
} satisfies SxStyle;
