import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.type/app";
// components
import AppChip from "@app.component/atom/AppChip";
import AppLinearProgress from "@app.component/atom/AppLinearProgress";

interface RecordInfoProgressProps {
  title: string;
  chipText?: string;
  value: number;
  minValueText?: string;
  maxValueText?: string;
}

export default function RecordInfoProgress({
  title,
  chipText,
  value,
  minValueText,
  maxValueText,
}: RecordInfoProgressProps) {
  return (
    <Box sx={styles.container}>
      <Box className="infoTitleArea">
        <Typography className="infoTitle">{title}</Typography>
        <AppChip label={chipText} />
      </Box>

      <Box className="progressArea">
        <AppLinearProgress
          className="progress"
          variant="determinate"
          value={value}
        />

        {minValueText && maxValueText && (
          <Box className="valueTextArea">
            <Typography className="valueText">{minValueText}</Typography>
            <Typography className="valueText">{maxValueText}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    width: "100%",
    "& .infoTitleArea": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .infoTitle": {
      color: "#a8a8a8",
      fontSize: "16px",
      fontWeight: 500,
      letterSpacing: "-0.8px",
    },
    "& .progressArea": {
      display: "flex",
      flexDirection: "column",
      "& .progress": {
        borderRadius: "8px",
        my: "5px",
      },
      "& .valueTextArea": {
        display: "flex",
        justifyContent: "space-between",
      },
      "& .valueText": {
        color: "#A8A8A8",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "-0.3px",
      },
    },
  },
} satisfies SxStyle;
