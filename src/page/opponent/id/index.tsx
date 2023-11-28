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

const tempData = {
  id: 1,
  title: "저녁 약속",
  fileName: "record-1.m4a",
  script: [
    {
      seq: 8,
      speaker: "이재혁",
      message: "늦지마 ㅡㅡ",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 25.44,
      neutral: 22.11,
      negative: 32.45,
    },
    {
      seq: 8,
      speaker: "이재혁",
      message: "ㅋㅋㅋ 그럼 그 때 보자",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 32.44,
      neutral: 34.11,
      negative: 3.45,
    },
    {
      seq: 7,
      speaker: "김진호",
      message: "오 몹시 좋은걸?",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 75.44,
      neutral: 22.11,
      negative: 3.45,
    },
    {
      seq: 6,
      speaker: "이재혁",
      message: "텐동집 맛있는 곳 생겼는데 같이 가볼래?",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 35.44,
      neutral: 44.11,
      negative: 10.45,
    },
    {
      seq: 5,
      speaker: "김진호",
      message: "좋아 좋아! 저녁은 뭘로 먹을까?",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 65.44,
      neutral: 34.11,
      negative: 10.45,
    },
    {
      seq: 4,
      speaker: "이재혁",
      message: "홍대 너무 번잡하니까 연남동쪽에서 보자",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 45.44,
      neutral: 54.11,
      negative: 10.45,
    },
    {
      seq: 3,
      speaker: "김진호",
      message: "끝나고 바로가면 괜찮을듯??",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 45.44,
      neutral: 42.11,
      negative: 12.45,
    },
    {
      seq: 2,
      speaker: "김진호",
      message: "홍대에서 4시에 약속 있긴 한데...",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 25.44,
      neutral: 32.11,
      negative: 42.45,
    },
    {
      seq: 1,
      speaker: "이재혁",
      message: "다음주 금요일에 시간 괜찮아?",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 35.44,
      neutral: 64.11,
      negative: 0.45,
    },
  ],
};

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
        <Typography className="title">{tempData.title}</Typography>
        <Box className="messageArea">
          {tempData.script
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
