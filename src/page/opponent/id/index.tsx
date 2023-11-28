import { useLocation, useParams } from "react-router-dom";
// styles
import { Box, Typography } from "@mui/material";
import { SxStyle } from "../../../types/app/style";
// hooks
import { useGetRecordDetail } from "@app.hooks/user";
// components
import PageLayout from "@app.layout/PageLayout";
import AppChat from "@app.component/molecule/AppChat";
// temp
import tempAudio from "@Over_the_Horizon.mp3";
import FeelingBox from "@app.component/molecule/FeelingBox";
// TODO: DELETE
import { tempDetailData } from "@constant/tempData";

export default function DetailRecordPage() {
  const { opponent, id } = useParams();
  const { state } = useLocation();
  const { data } = useGetRecordDetail(Number(id));
  console.log(data);
  // const { VITE_API_BASE_URL } = import.meta.env;

  return (
    <PageLayout>
      <Box sx={styles.container}>
        {state?.feeling && (
          <FeelingBox
            feeling={state.feeling}
            sx={{ position: "absolute", top: 0, right: 10 }}
          />
        )}
        <Typography className="title">{tempDetailData.title}</Typography>
        <Box className="messageArea">
          {tempDetailData.script
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

              const color =
                Object.keys(bestFeeling)[0] === "positive"
                  ? "var(--color-blue)"
                  : Object.keys(bestFeeling)[0] === "negative"
                  ? "var(--color-red)"
                  : "var(--color-black)";

              return (
                <AppChat
                  key={seq}
                  name={speaker}
                  message={message}
                  isOpponent={speaker === opponent}
                  percentage={Object.values(bestFeeling)[0]}
                  color={color}
                />
              );
            })}
        </Box>
        <audio src={tempAudio} controls autoPlay className="player">
          <source type="audio/*" />
          {/* <source
          src={`${VITE_API_BASE_URL}${GET_RECORD_FILE(tempData.fileName)}`}
        /> */}
          이 문장은 여러분의 브라우저가 audio 태그를 지원하지 않을 때
          표시됩니다!
        </audio>
      </Box>
    </PageLayout>
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
    pb: "100px",
    "& .title": { fontSize: "1.3rem", fontWeight: 600, pb: "80px" },
    "& .messageArea": { display: "grid", width: "100%", overflow: "scroll" },
    "& .player": {
      position: "fixed",
      bottom: "40px",
      width: "300px",
    },
  },
} satisfies SxStyle;
