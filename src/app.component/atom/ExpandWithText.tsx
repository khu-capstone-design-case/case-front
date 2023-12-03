// styles
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import type { SxStyle } from "@app.types/app";

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
    <Box
      sx={styles.container}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <Icon fontSize="small" />
      <Typography>{text}</Typography>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    width: "100%",
    "& svg": { fill: "#9F9F9F" },
    "& > p": { color: "#9F9F9F", fontSize: "12px", letterSpacing: "-0.6px" },
  },
} satisfies SxStyle;
