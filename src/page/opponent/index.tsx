import { useParams, useLocation } from "react-router-dom";
// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";
// hooks
import { useGetRecordByOpponent } from "@app.hooks/user";
// components
import PageWithGoBack from "@app.layout/PageWithGoBack";
import FloatingUploadButton from "@app.component/atom/FloatingUploadButton";
import RecordCard from "@app.component/template/RecordCard";
import Spacer from "@app.component/atom/Spacer";

export default function OpponentPage() {
  const { opponent } = useParams();
  const {
    state: { positive, neutral, negative },
  } = useLocation();

  const { data } = useGetRecordByOpponent(opponent);

  if (!opponent || !data || "error" in data) return null;

  return (
    <PageWithGoBack>
      <Box sx={styles.container}>
        <Typography className="opponent">{opponent}</Typography>

        <Spacer y={44} />

        <Box className="recordArea">
          {data.record.map((data) => (
            <RecordCard
              key={data.id}
              opponent={opponent}
              record={data}
              feeling={{ positive, neutral, negative }}
            />
          ))}
        </Box>
      </Box>

      <FloatingUploadButton state={{ opponent }} />
    </PageWithGoBack>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    "& .opponent": {
      color: "#525252",
      fontSize: "20px",
      fontWeight: 600,
      letterSpacing: "-1px",
      mt: "18px",
    },
    "& .recordArea": {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      "& > div:not(:last-child)": { mb: "20px" },
    },
  },
} satisfies SxStyle;
