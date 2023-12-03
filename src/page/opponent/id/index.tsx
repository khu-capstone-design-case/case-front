import { useParams } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";
// hooks
import { useGetRecordDetail } from "@app.hooks/user";
// components
import PageWithGoBack from "@app.layout/PageWithGoBack";
import AppChat from "@app.component/molecule/AppChat";
import Spacer from "@app.component/atom/Spacer";

const { VITE_API_BASE_URL } = import.meta.env;

export default function DetailRecordPage() {
  const { opponent, id } = useParams();
  const { data } = useGetRecordDetail(id);

  if (!data || "error" in data) return null;
  const { title, fileName, script } = data;

  return (
    <PageWithGoBack>
      <Box sx={styles.container}>
        <Spacer y={18} />
        <Typography className="title">{title}</Typography>
        <AudioPlayer
          className="player"
          autoPlay
          src={`${VITE_API_BASE_URL}/api/record/${fileName}`}
        />

        <Box className="messageArea">
          <Typography className="completeText">
            {script.length
              ? "대화분석을 완료했습니다!"
              : "분석된 대화가 없어요."}
          </Typography>
          {script
            .reverse()
            .map(({ seq, message, speaker, positive, neutral, negative }) => {
              const feeling = { positive, neutral, negative };

              const bestFeeling = Object.keys(feeling).reduce(
                (acc: Record<string, number>, cur) => {
                  const curKey = cur as keyof typeof feeling;
                  return feeling[curKey] > Object.values(acc)[0]
                    ? { [curKey]: feeling[curKey] }
                    : acc;
                },
                { positive }
              );

              const bgcolor =
                Object.keys(bestFeeling)[0] === "positive"
                  ? "var(--color-blue-light)"
                  : Object.keys(bestFeeling)[0] === "negative"
                  ? "var(--color-red-light)"
                  : "#E2E2E2";

              return (
                <AppChat
                  key={seq}
                  name={speaker}
                  message={message}
                  isOpponent={speaker !== opponent}
                  bgcolor={bgcolor}
                />
              );
            })}
        </Box>
      </Box>
    </PageWithGoBack>
  );
}

const styles = {
  container: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflowY: "scroll",
    "& .title": {
      color: "#525252",
      fontSize: "20px",
      fontWeight: 600,
      letterSpacing: "-1px",
    },
    "& .completeText": {
      justifySelf: "center",
      color: "#525252",
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "36px",
      letterSpacing: "-1.2px",
    },
    "& .messageArea": { display: "grid", width: "100%", overflow: "scroll" },
    "& .player": {
      m: "32px 0 16px 0",
      position: "sticky",
      maxWidth: "350px",
    },
  },
} satisfies SxStyle;
