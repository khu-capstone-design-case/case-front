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
  self?: string;
  bgcolor?: string;
  selectMode?: boolean;
  checkedSeq: number[];
  toggleCheck: (checked: boolean, seq: number) => void;
}

export default function AppChat({
  info,
  isOpponent,
  self,
  bgcolor = "#E2E2E2",
  selectMode = false,
  checkedSeq,
  toggleCheck,
}: AppChatProps) {
  const { seq, message, speaker } = info;

  const checked = checkedSeq.some((value) => value === seq);
  const Icon = checked ? CircleFill : CircleEmpty;

  return (
    <Box
      sx={styles.container}
      data-opponent={isOpponent}
      onClick={() => {
        if (!selectMode) return;
        toggleCheck(checked, seq);
      }}
    >
      <Typography className="name">{isOpponent ? speaker : self}</Typography>

      <Box className="messageArea" data-select-mode={selectMode}>
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
  container: {
    display: "grid",
    maxWidth: "85%",
    pb: "8px",
    "& .messageArea": {
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "visible",
      width: "fit-content",
      "& .messageBox": {
        minHeight: "32px",
        borderRadius: "2px 8px 8px 8px",
        p: "5px 15px",
        mx: "5px",
        fontSize: "0.875rem",
      },
      "& svg": {
        position: "absolute",
        zIndex: 9,
        cursor: "pointer",
        right: "-15px",
      },
    },
    "& .name": {
      color: "#7D7D7D",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: "-0.8px",
    },
    "&[data-select-mode='true']": { cursor: "pointer" },
    "&[data-opponent='false']": {
      justifySelf: "flex-end",
      "& p": { justifySelf: "flex-end" },
      "& .messageBox": {
        borderRadius: "8px 2px 8px 8px",
      },
      "& svg": { left: "-15px", right: "unset" },
    },
  },
} satisfies SxStyle;
