// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";
// types
import type { RecordDetail } from "@app.types/api";
// components
import { ReactComponent as CircleEmpty } from "/public/icon/CircleEmpty.svg";
import { ReactComponent as CircleFill } from "/public/icon/CircleFill.svg";

interface AppChatProps {
  info: RecordDetail;
  isOpponent?: boolean;
  bgcolor?: string;
  selectMode?: boolean;
  checkedSeq: { seq: number; msg: string }[];
  toggleCheck?: (
    checked: boolean,
    message: { seq: number; msg: string }
  ) => void;
}

export default function AppChat({
  info,
  isOpponent,
  bgcolor = "#E2E2E2",
  selectMode = false,
  checkedSeq,
  toggleCheck,
}: AppChatProps) {
  const { seq, message, speaker } = info;

  const checked = checkedSeq.some((value) => value.seq === seq);
  const Icon = checked ? CircleFill : CircleEmpty;

  return (
    <Box
      sx={styles.container(!!isOpponent)}
      onClick={() => {
        if (!selectMode) return;
        toggleCheck?.(checked, { seq, msg: message });
      }}
    >
      <Typography className="name">{speaker}</Typography>

      <Box className="messageArea">
        {selectMode && !isOpponent && <Icon />}
        <Typography className="messageBox" sx={{ bgcolor }}>
          {message}
        </Typography>
        {selectMode && isOpponent && <Icon />}
      </Box>
    </Box>
  );
}

const styles = {
  container: (isOpponent: boolean) => ({
    display: "grid",
    maxWidth: "85%",
    justifySelf: isOpponent ? "flex-start" : "flex-end",
    pb: "8px",
    "& p": { justifySelf: isOpponent ? "flex-start" : "flex-end" },
    "& .messageArea": {
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "visible",
      "& .messageBox": {
        minHeight: "32px",
        borderRadius: `${isOpponent ? "2px 8px" : "8px 2px"} 8px 8px`,
        p: "5px 15px",
        mx: "5px",
        fontSize: "0.875rem",
      },
      "& svg": {
        position: "absolute",
        zIndex: 9,
        cursor: "pointer",
        ...(isOpponent ? { right: "-15px" } : { left: "-15px" }),
      },
    },
    "& .name": {
      color: "#7D7D7D",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: "-0.8px",
    },
    "& .percentage": { fontSize: "0.75rem", px: "8px" },
  }),
} satisfies SxStyle;
