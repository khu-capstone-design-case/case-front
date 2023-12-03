// TODO: Delete this component

// styles
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

interface CardWithFeelingProps {
  onClick?: () => void;
  title: string;
  subTitle?: string;
  feeling: { positive: number; neutral: number; negative: number };
}
export default function CardWithFeeling({
  onClick,
  title,
  subTitle,
  feeling,
}: CardWithFeelingProps) {
  return (
    <Card onClick={onClick} sx={styles.container}>
      <CardActionArea>
        <CardContent>
          <Box className="textArea">
            <Typography className="title">{title}</Typography>
            {subTitle && (
              <Typography className="subTitle">{subTitle}</Typography>
            )}
          </Box>
          <Box>
            <Typography className="feeling positive">
              {feeling.positive}%
            </Typography>
            <Typography className="feeling neutral">
              {feeling.neutral}%
            </Typography>
            <Typography className="feeling negative">
              {feeling.negative}%
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const styles = {
  container: {
    margin: "15px 0 15px 0",
    borderRadius: "8px",
    "& .MuiCardActionArea-root": {
      width: 345,
      minHeight: 100,
    },
    "& .MuiCardContent-root": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& .textArea": {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      },
      "& .title": { fontSize: "1rem", fontWeight: 500, mb: "5px" },
      "& .subTitle": { fontSize: "0.75rem" },
      "& .feeling": { fontSize: "0.75rem", fontWeight: 600 },
      "& .positive": { color: "var(--color-blue)" },
      "& .neutral": { fontWeight: 500 },
      "& .negative": { color: "var(--color-red)" },
    },
  },
};
