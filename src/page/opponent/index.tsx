import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "@app.types/app";
// lib
import { convertSeconds } from "@lib";
// hooks
import { useInternalRouter } from "@app.hooks/route";
import {
  DeleteRecordByOpponentMutation,
  useGetRecordByOpponent,
} from "@app.hooks/user";
// components
import PageWithGoBack from "@app.layout/PageWithGoBack";
import FloatingUploadButton from "@app.component/atom/FloatingUploadButton";
import { ReactComponent as Delete } from "/public/icon/Delete.svg";
import RecordCard from "@app.component/page/opponent/RecordCard";
import Spacer from "@app.component/atom/Spacer";
import OpponentEmpty from "@app.component/page/opponent/OpponentEmpty";
import AppModal from "@app.component/template/AppModal";
import { enqueueSnackbar } from "notistack";

export default function OpponentPage() {
  const router = useInternalRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { opponent } = useParams();

  const { data } = useGetRecordByOpponent(opponent);

  const { mutateAsync: deleteRecord } = DeleteRecordByOpponentMutation();

  useEffect(() => {}, []);
  if (!opponent || !data || "error" in data) return null;

  const deleteOpponent = async () => {
    if (!data?.opponent) return;
    if (data.record.some(({ seq }) => seq !== 5)) {
      enqueueSnackbar("분석중인 대화가 있어요!", { variant: "error" });
      return;
    }
    const res = await deleteRecord(data.opponent);
    if (!(res && "error" in res)) {
      router.replace("/");
    }
  };

  const totalLength = data.record.reduce((acc, { length }) => acc + length, 0);

  return (
    <PageWithGoBack>
      <Box sx={styles.container}>
        <Spacer y={18} />
        <Box className="header">
          <Typography className="opponent">{opponent}</Typography>
          <Delete onClick={() => setOpenDeleteModal(true)} />
        </Box>

        <Spacer y={44} />

        <Box className="recordArea">
          <Typography className="timeText">
            총 {convertSeconds(totalLength, "ko")}의 대화를 나눴습니다!
          </Typography>
          <Spacer y={32} />
          {data.record.length ? (
            data.record.map((data) => (
              <RecordCard key={data.id} opponent={opponent} record={data} />
            ))
          ) : (
            <OpponentEmpty opponent={opponent} />
          )}
        </Box>
        <AppModal
          open={openDeleteModal}
          title="잠시만요!"
          type="confirm"
          btn1Text="확인"
          btn1Handler={deleteOpponent}
          btn2Text="취소"
          btn2Handler={() => setOpenDeleteModal(false)}
        >
          모든 통화내역이 사라져요.
          <br />
          그래도 삭제하시겠어요?
        </AppModal>
        <FloatingUploadButton uploadState={{ opponent }} />
      </Box>
    </PageWithGoBack>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    overflow: "scroll",
    "& .header": {
      display: "flex",
      width: "100%",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      "& .opponent": {
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
    "& .timeText": {
      color: "#525252",
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "36px",
      letterSpacing: "-1.2px",
    },
    "& .recordArea": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      "& > div:not(:last-child)": { mb: "20px" },
    },
  },
} satisfies SxStyle;
