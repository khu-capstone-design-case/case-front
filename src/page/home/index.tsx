// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";
// hooks
// import { useGetUserMain } from "@app.hooks/user";
// components
import { ReactComponent as CharacterMain } from "/public/image/CharacterMain.svg";
import FloatingUploadButton from "@app.component/atom/FloatingUploadButton";
import OpponentCard from "@app.component/page/home/OpponentCard";
import Spacer from "@app.component/atom/Spacer";
import HomeEmpty from "@app.component/page/home/HomeEmpty";

export default function HomePage() {
  const data = {
    talker: [
      {
        id: 1,
        opponent: "이재혁",
        length: 680,
        point: 54.6,
        positive: 8.1,
        neutral: 88.4,
        negative: 3.5,
      },
      {
        id: 2,
        opponent: "김법진",
        length: 207,
        point: 64.6,
        positive: 38.1,
        neutral: 38.4,
        negative: 23.5,
      },
    ],
  };

  // const { data } = useGetUserMain();

  // if (!data || "error" in data) return null;
  const { talker } = data;

  return (
    <Box sx={styles.container}>
      <Spacer y={7} />

      <Typography className="mainTitle">
        오늘은 누구의 마음이 궁금하신가요?
      </Typography>

      <Spacer y={22} />
      <CharacterMain className="mainLogo" />

      {talker.length ? (
        <Box className="cardArea">
          {talker.map((record) => (
            <OpponentCard key={record.id} record={record} />
          ))}
        </Box>
      ) : (
        <HomeEmpty />
      )}

      <FloatingUploadButton />
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "scroll",
    "& .mainTitle": {
      color: "#525252",
      fontSize: "20px",
      fontWeight: 600,
      letterSpacing: "-0.4px",
    },
    "& .mainLogo": {
      flexShrink: 0,
    },
    "& .cardArea": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      "& > div:not(:last-child)": { mb: "20px" },
    },
  },
} satisfies SxStyle;
