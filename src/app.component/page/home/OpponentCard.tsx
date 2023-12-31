import { useState } from "react";
// styles
import { Box, Typography, Collapse } from "@mui/material";
// hooks
import { useInternalRouter } from "@app.hook/route";
// types
import type { RecordMain } from "@app.type/api";
import type { SxStyle } from "@app.type/app";
// components
import Spacer from "@app.component/atom/Spacer";
import FeelingWithProgress from "@app.component/molecule/FeelingWithProgress";
import ExpandWithText from "@app.component/atom/ExpandWithText";
import OpponentCardDetail from "@app.component/molecule/OpponentCardDetail";

interface OpponentCardProps {
  record: RecordMain;
}

export default function OpponentCard({ record }: OpponentCardProps) {
  const router = useInternalRouter();

  const [open, setOpen] = useState(false);
  const { id, opponent, point } = record;

  const goOpponentPage = () => {
    router.push(`/${encodeURIComponent(opponent)}`);
  };

  return (
    <Box key={id} sx={styles.container}>
      <Box className="summary" onClick={goOpponentPage}>
        <Box className="nameLine">
          <Typography className="name">{opponent}</Typography>
        </Box>
        <Spacer y={10} />
        <FeelingWithProgress score={point} />
        <Spacer y={20} />
        <Collapse sx={styles.collapse} in={open}>
          <OpponentCardDetail record={record} />
        </Collapse>
      </Box>

      <Spacer y={20} />

      <ExpandWithText open={open} onClick={() => setOpen((prev) => !prev)} />
    </Box>
  );
}

const styles = {
  container: {
    width: "95%",
    borderRadius: "8px",
    bgcolor: "#fff",
    p: "20px 20px 11px 20px",
    boxShadow: 2,
    "&:hover": { boxShadow: 3 },
    "& .summary": {
      width: "100%",
      cursor: "pointer",
      "& .nameLine": {
        width: "100%",
      },
      "& .name": {
        color: "#525252",
        fontSize: "20px",
        fontWeight: 600,
        letterSpacing: "-1.2px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
  },
  collapse: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
} satisfies SxStyle;
