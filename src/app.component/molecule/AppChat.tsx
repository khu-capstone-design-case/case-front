import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";

interface AppChatProps {
  name: string;
  message: string;
  isOpponent?: boolean;
  percentage?: number;
  color?: string;
}

export default function AppChat({
  name,
  message,
  isOpponent,
  percentage,
  color = "#000",
}: AppChatProps) {
  return (
    <Box sx={styles.container(!!isOpponent)}>
      <Typography className="percentage">{name}</Typography>
      <Typography className="message" sx={{ color }}>
        {message}
      </Typography>
      {percentage && (
        <Typography className="percentage" sx={{ color }}>
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
      bgcolor: "var(--color-gray-50)",
      borderRadius: "12px",
      p: "5px 15px",
      fontSize: "0.875rem",
    },
    "& .percentage": { fontSize: "0.75rem", px: "8px" },
  }),
} satisfies SxStyle;
