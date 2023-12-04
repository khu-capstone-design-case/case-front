import { Link } from "react-router-dom";
import dayjs from "dayjs";
// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";
import type { RecordOpponent } from "@app.types/api";
// lib
import { convertSeconds, getFeelingScore } from "@lib";
// components
import RecordInfoProgress from "@app.component/molecule/RecordInfoProgress";
import Spacer from "@app.component/atom/Spacer";

interface RecordCardProps {
  opponent: string;
  record: RecordOpponent;
}
export default function RecordCard({ opponent, record }: RecordCardProps) {
  const { id, title, timestamp, point, length } = record;
  const result = getFeelingScore(point);

  const callTime = length >= 3600 ? 100 : Math.floor(length / 60);

  return (
    <Box sx={styles.container}>
      <Link to={`/${opponent}/${id}`} style={{ width: "100%" }}>
        <Box className="titleArea">
          <Typography className="title">{title}</Typography>
          <Typography className="date">
            {dayjs(timestamp).format("YYYY-MM-DD")}
          </Typography>
        </Box>

        <Spacer y={17} />

        <RecordInfoProgress
          title="통화시간"
          chipText={convertSeconds(length)}
          value={callTime}
          minValueText="0h"
          maxValueText="1h"
        />

        <Spacer y={12} />

        <RecordInfoProgress
          title="호감도 점수"
          chipText={result.feeling}
          value={point}
          minValueText="Positive"
          maxValueText="Negative"
        />
      </Link>
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
    boxShadow: 2,
    "&:hover": { boxShadow: 3 },
    cursor: "pointer",
    "& .titleArea": {
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      "& .title": {
        maxWidth: "70%",
        color: "#525252",
        fontSize: "24px",
        fontWeight: 600,
        letterSpacing: "-1.2px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
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
