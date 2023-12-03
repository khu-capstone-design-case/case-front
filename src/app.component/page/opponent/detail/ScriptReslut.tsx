import { Box, CircularProgress, Typography } from "@mui/material";
// types
import type { Feeling, SxStyle } from "@app.types/app";

interface ScriptResultProps {
  feeling?: Feeling | null;
  isLoading: boolean;
}

export default function ScriptResult({
  feeling,
  isLoading,
}: ScriptResultProps) {
  return (
    <Box sx={styles.container}>
      {!feeling || isLoading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography className="text positive">
            긍정: {feeling.positive}%
          </Typography>
          <Typography className="text neutral">
            보통: {feeling.neutral}%
          </Typography>
          <Typography className="text negative">
            부정: {feeling.negative}%
          </Typography>
        </Box>
      )}
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    "& .text": {
      fontSize: "18px",
      fontWeight: 500,
      letterSpacing: "-0.8px",
    },
    "& .positive": { color: "var(--color-primary)" },
    "& .neutral": { color: "#525252", my: "5px" },
    "& .negative": { color: "var(--color-red)" },
  },
} satisfies SxStyle;
