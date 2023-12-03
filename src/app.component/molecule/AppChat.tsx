import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";

interface AppChatProps {
  name: string;
  message: string;
  isOpponent?: boolean;
  percentage?: number;
  bgcolor?: string;
}

export default function AppChat({
  name,
  message,
  isOpponent,
  percentage,
  bgcolor = "#E2E2E2",
}: AppChatProps) {
  return (
    <Box sx={styles.container(!!isOpponent)}>
      <Typography className="name">{name}</Typography>
      <Typography className="message" sx={{ bgcolor }}>
        {message}
      </Typography>
      {percentage && (
        <Typography className="percentage" sx={{ bgcolor }}>
          {percentage}%
        </Typography>
      )}
    </Box>
  );
}

const styles = {
  container: (isOpponent: boolean) => ({
    display: "grid",
    width: "fit-content",
    maxWidth: "85%",
    justifySelf: isOpponent ? "flex-start" : "flex-end",
    pb: "8px",
    "& p": { justifySelf: isOpponent ? "flex-start" : "flex-end" },
    "& .message": {
      minHeight: "32px",
      borderRadius: `${isOpponent ? "2px 8px" : "8px 2px"} 8px 8px`,
      p: "5px 15px",
      fontSize: "0.875rem",
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
