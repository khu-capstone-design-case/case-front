import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.type/app";
// hooks
import { useInternalRouter } from "@app.hook/route";
// constants
import { UPLOAD_PATH } from "@constant/path";
// components
import Spacer from "@app.component/atom/Spacer";

export default function HomeEmpty() {
  const router = useInternalRouter();

  return (
    <Box sx={styles.container}>
      <Typography className="textMain">저장된 대화가 없어요.</Typography>
      <Spacer y={20} />
      <Typography className="textSub" onClick={() => router.push(UPLOAD_PATH)}>
        클릭해서 음성파일을 올리고 감정을 분석해보세요!
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
