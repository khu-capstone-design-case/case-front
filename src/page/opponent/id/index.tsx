import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
// styles
import { Box, Typography } from "@mui/material";
import type { Feeling, SxStyle } from "@app.type/app";
// hooks
import { useInternalRouter } from "@app.hook/route";
import {
  DeleteRecordDetailMutation,
  useGetRecordDetail,
  useScriptAnalysisMutation,
} from "@app.hook/user";
// components
import PageWithGoBack from "@app.layout/PageWithGoBack";
import { ReactComponent as Delete } from "@asset/icon/Delete.svg";
import Spacer from "@app.component/atom/Spacer";
import AppModal from "@app.component/template/AppModal";
import AppButton from "@app.component/atom/AppButton";
import MessageView from "@app.component/page/opponent/detail/MessageView";
import ScriptResult from "@app.component/page/opponent/detail/ScriptReslut";

const { VITE_API_BASE_URL } = import.meta.env;

export default function DetailRecordPage() {
  const router = useInternalRouter();
  const { opponent, id: paramId } = useParams();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openScriptModal, setOpenScriptModal] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [checkedSeq, setCheckedSeq] = useState<number[]>([]);
  const [scriptResult, setScriptResult] = useState<Feeling | null>(null);

  const { data } = useGetRecordDetail(Number(paramId));
  const { mutateAsync: deleteRecord } = DeleteRecordDetailMutation(
    String(opponent)
  );
  const { mutateAsync: scriptAnalysis, isPending } =
    useScriptAnalysisMutation();

  const toggleCheck = useCallback((checked: boolean, seq: number) => {
    if (!checked) {
      setCheckedSeq((prev) => {
        const newValue = [...prev, seq].sort();
        return newValue;
      });
    } else {
      setCheckedSeq((prev) => prev.filter((value) => value !== seq));
    }
  }, []);

  if (!data || "error" in data) return null;

  const { id, title, fileName, script } = data;

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

        <MessageView
          script={script}
          selectMode={selectMode}
          checkedSeq={checkedSeq}
          toggleCheck={toggleCheck}
        />

        {!!script.length && (
          <AppButton
            className="button"
            onClick={async () => {
              if (selectMode && checkedSeq.length !== 0) {
                setOpenScriptModal(true);
                const res = await scriptAnalysis({ id, seq: checkedSeq });
                if ("error" in res) {
                  setOpenScriptModal(false);
                } else {
                  setScriptResult(res);
                }
              }
              setSelectMode((prev) => {
                if (prev) setCheckedSeq([]);
                return !prev;
              });
            }}
          >
            {selectMode ? "뉘앙스 판단하기" : "대화 선택하기"}
          </AppButton>
        )}
      </Box>

      <AppModal
        open={openScriptModal}
        title="분석 결과에요!"
        type="alert"
        btn1Text="확인"
        btn1Handler={() => setOpenScriptModal(false)}
      >
        <ScriptResult feeling={scriptResult} isLoading={isPending} />
      </AppModal>

      <AppModal
        open={openDeleteModal}
        title="정말로 삭제하시겠어요?"
        type="confirm"
        btn1Text="확인"
        btn1Handler={async () => {
          if (!data?.id) return;
          const res = await deleteRecord(data.id);
          if (!(res && "error" in res)) {
            router.replace(`/${opponent}`);
          }
        }}
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
    "& .player": {
      borderRadius: "8px",
      m: "32px 0 16px 0",
      position: "sticky",
      width: "98%",
      "& .rhap_progress-indicator, .rhap_progress-filled, .rhap_volume-indicator":
        {
          bgcolor: "var(--color-primary)",
        },
      "& .rhap_download-progress, .rhap_volume-bar": {
        bgcolor: "var(--color-primary-light)",
      },
      "& path,": { fill: "var(--color-primary)" },
    },
    "& .button": {
      width: "288px",
      height: "52px",
      p: "14px 40px",
      mt: "auto",
      mb: "20px",
      borderRadius: "26px",
      fontWeight: 600,
    },
  },
} satisfies SxStyle;
