import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";
// constants
import { UPLOAD_PATH } from "@constant/path";
// hooks
import { useInternalRouter } from "@app.hooks/route";
// components
import Spacer from "@app.component/atom/Spacer";

interface OpponentEmptyProps {
  opponent: string;
}

export default function OpponentEmpty({ opponent }: OpponentEmptyProps) {
  const router = useInternalRouter();

  return (
    <Box sx={styles.container}>
      <Typography className="textMain">대화내역이 없어요.</Typography>
      <Spacer y={20} />
      <Typography className="textSub" onClick={() => router.push(UPLOAD_PATH)}>
        클릭해서 {opponent}님과의 대화를 분석해보세요!
      </Typography>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "45vh",
    "& .textMain": {
      color: "#535353",
      fontSize: "24px",
      fontWeight: 700,
      letterSpacing: "-1.2px",
    },
    "& .textSub": {
      color: "#ADADAD",
      fontSize: "16px",
      fontWeight: 500,
      letterSpacing: "-0.8px",
      cursor: "pointer",
    },
  },
} satisfies SxStyle;
