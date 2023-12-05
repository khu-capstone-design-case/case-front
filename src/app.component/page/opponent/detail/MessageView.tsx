import { useState } from "react";
// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";
// types
import type { RecordDetail } from "@app.types/api";
// components
import AppChat from "@app.component/molecule/AppChat";
import AppButton from "@app.component/atom/AppButton";
import Spacer from "@app.component/atom/Spacer";

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
  const [toggleOpponent, setToggleOpponent] = useState(false);
  const names = Array.from(new Set(script.map(({ speaker }) => speaker)));

  const toggledScript = script.map(({ speaker, ...rest }) => {
    const newSpeaker = names.filter((name) => name !== speaker)[0];
    return { speaker: newSpeaker, ...rest };
  });

  return (
    <Box sx={styles.container}>
      {script.length ? (
        <AppButton
          className="toggleButton"
          onClick={() => setToggleOpponent((prev) => !prev)}
        >
          화자 변경
        </AppButton>
      ) : (
        <Typography className="completeText">분석된 대화가 없어요.</Typography>
      )}

      <Spacer y={20} />

      {(!toggleOpponent ? script : toggledScript).map((info) => {
        const { seq, positive, neutral, negative } = info;
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

const styles = {
  container: {
    display: "grid",
    width: "100%",
    overflow: "scroll",
    "& .toggleButton": {
      fontSize: "16px",
      width: "80%",
      justifySelf: "center",
      bgcolor: "var(--color-blue)",
      ":hover": { bgcolor: "var(--color-blue)" },
    },
    "& .completeText": {
      justifySelf: "center",
      color: "#525252",
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "36px",
      letterSpacing: "-1.2px",
    },
  },
} satisfies SxStyle;
