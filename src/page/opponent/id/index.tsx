import { useParams } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";
// hooks
import {
  DeleteRecordDetailMutation,
  useGetRecordDetail,
} from "@app.hooks/user";
// components
import PageWithGoBack from "@app.layout/PageWithGoBack";
import { ReactComponent as Delete } from "/public/icon/Delete.svg";
import AppChat from "@app.component/molecule/AppChat";
import Spacer from "@app.component/atom/Spacer";
import { useState } from "react";
import AppModal from "@app.component/template/AppModal";
import { useInternalRouter } from "@app.hooks/route";

const { VITE_API_BASE_URL } = import.meta.env;

export default function DetailRecordPage() {
  const router = useInternalRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { opponent, id } = useParams();
  const { data } = useGetRecordDetail(id);

  const { mutateAsync } = DeleteRecordDetailMutation();

  if (!data || "error" in data) return null;

  const deleteRecord = async () => {
    if (!data?.id) return;
    const res = await mutateAsync(data.id);
    if (!(res && "error" in res)) {
      router.replace(`/${opponent}`);
    }
  };

  const { title, fileName, script } = tempData;

  return (
    <PageWithGoBack>
      <Box sx={styles.container}>
        <Spacer y={18} />
        <Box className="header">
          <Typography className="title">{title}</Typography>
          <Delete onClick={() => setOpenDeleteModal(true)} />
        </Box>

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
      <AppModal
        open={openDeleteModal}
        title="정말로 삭제하시겠어요?"
        type="confirm"
        btn1Text="확인"
        btn1Handler={deleteRecord}
        btn2Text="취소"
        btn2Handler={() => setOpenDeleteModal(false)}
      />
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
    "& .header": {
      display: "flex",
      width: "100%",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      "& .title": {
        color: "#525252",
        fontSize: "20px",
        fontWeight: 600,
        letterSpacing: "-1px",
      },
      "& svg": {
        cursor: "pointer",
        position: "absolute",
        right: 0,
      },
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

const tempData = {
  id: 1,
  title: "졸업요건",
  fileName: "record-1.m4a",
  script: [
    {
      seq: 9,
      speaker: "test",
      message: "네 알려주셔서 감사합니다!",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 35.44,
      neutral: 64.11,
      negative: 0.45,
    },
    {
      seq: 8,
      speaker: "경희대학교 컴퓨터공학과 행정실 직원",
      message: "TOPCIT은 안따셔도 괜찮습니다.",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 35.44,
      neutral: 64.11,
      negative: 0.45,
    },
    {
      seq: 7,
      speaker: "test",
      message: "안녕하세요, 혹시 컴퓨터공학과 졸업 요건에 TOPCIT이 필요한가요?",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 35.44,
      neutral: 64.11,
      negative: 0.45,
    },
    {
      seq: 6,
      speaker: "test",
      message: "네 알려주셔서 감사합니다!",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 35.44,
      neutral: 64.11,
      negative: 90.45,
    },
    {
      seq: 5,
      speaker: "경희대학교 컴퓨터공학과 행정실 직원",
      message: "TOPCIT은 안따셔도 괜찮습니다.",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 35.44,
      neutral: 64.11,
      negative: 0.45,
    },
    {
      seq: 4,
      speaker: "test",
      message: "안녕하세요, 혹시 컴퓨터공학과 졸업 요건에 TOPCIT이 필요한가요?",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 35.44,
      neutral: 64.11,
      negative: 0.45,
    },
    {
      seq: 3,
      speaker: "test",
      message: "네 알려주셔서 감사합니다!",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 95.44,
      neutral: 64.11,
      negative: 0.45,
    },
    {
      seq: 2,
      speaker: "경희대학교 컴퓨터공학과 행정실 직원",
      message: "TOPCIT은 안따셔도 괜찮습니다.",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 35.44,
      neutral: 64.11,
      negative: 0.45,
    },
    {
      seq: 1,
      speaker: "test",
      message: "안녕하세요, 혹시 컴퓨터공학과 졸업 요건에 TOPCIT이 필요한가요?",
      startTime: 152132141414,
      endTime: 1241241431543,
      positive: 35.44,
      neutral: 64.11,
      negative: 0.45,
    },
  ],
};
