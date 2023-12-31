import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.type/app";
import type { GetProgressResponse, RecordOpponent } from "@app.type/api";
// constants
import { GET_PROGRESS } from "@app.endpoint";
// lib
import { API, convertSeconds, getFeelingScore } from "@lib";
// components
import RecordInfoProgress from "@app.component/molecule/RecordInfoProgress";
import Spacer from "@app.component/atom/Spacer";
import UploadProgress from "@app.component/molecule/UploadProgress";
import AppChip from "@app.component/atom/AppChip";

interface RecordCardProps {
  opponent: string;
  record: RecordOpponent;
  refetch?: () => void;
}

export default function RecordCard({
  opponent,
  record,
  refetch,
}: RecordCardProps) {
  const { id, seq, title, timestamp, summary, point, length } = record;
  const [curSec, setCurSec] = useState(seq);

  const result = getFeelingScore(point);
  const callTime = length >= 3600 ? 100 : Math.floor(length / 60);

  useEffect(() => {
    if (curSec === 5) {
      refetch?.();
      return;
    }

    const interval = setInterval(async () => {
      const res = await API.GET<GetProgressResponse>(GET_PROGRESS({ id }));
      setCurSec(res.seq);
    }, 3000);

    return () => clearInterval(interval);
  }, [id, curSec, refetch]);

  if (curSec !== 5)
    return (
      <Box sx={styles.container}>
        <UploadProgress seq={curSec} />
      </Box>
    );

  return (
    <Box sx={styles.container}>
      <Link to={`/${opponent}/${id}`} style={{ width: "100%" }}>
        <Box className="titleArea">
          <Typography className="title">{title}</Typography>
          <Typography className="date">
            {dayjs(timestamp).format("YYYY-MM-DD")}
          </Typography>
        </Box>

        <Spacer y={4} />

        {summary?.slice(0, 3).map((tag) => (
          <AppChip key={tag} className="tag" label={tag} />
        ))}

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
    borderRadius: "8px",
    p: "20px",
    boxShadow: 2,
    cursor: "pointer",
    "&:hover": { boxShadow: 3 },
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
    "& .tag": { mr: "10px", fontWeight: 600 },
  },
} satisfies SxStyle;
