// styles
import { Box, Typography } from "@mui/material";
// store
import { authStore } from "@app.store/authStore";
// types
import type { RecordDetail } from "@app.types/api";
// components
import AppChat from "@app.component/molecule/AppChat";

interface MessageViewProps {
  script: RecordDetail[];
  selectMode: boolean;
  checkedSeq: number[];
  toggleCheck: (checked: boolean, seq: number) => void;
}

export default function MessageView({
  script,
  selectMode,
  checkedSeq,
  toggleCheck,
}: MessageViewProps) {
  const { user } = authStore();

  return (
    <Box className="messageArea">
      <Typography className="completeText">
        {script.length ? "대화분석을 완료했습니다!" : "분석된 대화가 없어요."}
      </Typography>

      {script.map((info) => {
        const { seq, speaker, positive, neutral, negative } = info;
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
            info={info}
            isOpponent={speaker !== user?.name}
            bgcolor={bgcolor}
            selectMode={selectMode}
            checkedSeq={checkedSeq}
            toggleCheck={toggleCheck}
          />
        );
      })}
    </Box>
  );
}
