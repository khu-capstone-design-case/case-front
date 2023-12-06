// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.type/app";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface ExpandWithTextProps {
  open: boolean;
  text?: string;
  onClick?: () => void;
}

export default function ExpandWithText({
  open,
  text = "MORE",
  onClick,
}: ExpandWithTextProps) {
  const Icon = open ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;

  return (
    <Box sx={styles.container}>
      <Box
        className="buttonWrapper"
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        <Icon fontSize="small" />
        <Typography>{text}</Typography>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    "& .buttonWrapper": {
      display: "flex",
      cursor: "pointer",
      "& svg": { fill: "#9F9F9F" },
      "& > p": { color: "#9F9F9F", fontSize: "12px", letterSpacing: "-0.6px" },
    },
  },
} satisfies SxStyle;
