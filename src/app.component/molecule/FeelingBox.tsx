import { Box, SxProps, Typography } from "@mui/material";

interface FeelingBoxProps {
  feeling: { positive: number; neutral: number; negative: number };
  sx?: SxProps;
}
export default function FeelingBox({ feeling, sx }: FeelingBoxProps) {
  return (
    <Box sx={{ ...styles.feelingBox, ...sx }}>
      <Typography className="positive">긍정: {feeling.positive}%</Typography>
      <Typography>보통: {feeling.neutral}%</Typography>
      <Typography className="negative">부정: {feeling.negative}%</Typography>
    </Box>
  );
}

const styles = {
  feelingBox: {
    "& > p": {
      fontSize: "0.875rem",
      fontWeight: 600,
    },
    "& .positive": { color: "var(--color-blue)" },
    "& .negative": { color: "var(--color-red)" },
  },
};
