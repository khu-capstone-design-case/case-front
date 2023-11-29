import { useParams, useLocation } from "react-router-dom";
// styles
import { Box, Typography } from "@mui/material";
import { SxStyle } from "../../types/app/style";
// hooks
import { useGetRecordByOpponent } from "@app.hooks/user";
import { useInternalRouter } from "@app.hooks/route";
// components
import CardWithFeeling from "@app.component/template/CardWithFeeling";
import PageLayout from "@app.layout/PageLayout";
import FloatingUploadButton from "@app.component/atom/FloatingUploadButton";
import FeelingBox from "@app.component/molecule/FeelingBox";

export default function OpponentPage() {
  const router = useInternalRouter();
  const { opponent } = useParams();
  const {
    state: { positive, neutral, negative },
  } = useLocation();

  const { data } = useGetRecordByOpponent(opponent);

  if (!data || "error" in data) return null;

  return (
    <PageLayout to="/">
      <Box sx={styles.container}>
        <Typography className="opponent">{opponent}</Typography>
        <Box className="feelingBox">
          <FeelingBox feeling={{ positive, neutral, negative }} />
          <Typography className="description">
            숫자는 대화속 감정수치를 의미해요!
          </Typography>
        </Box>

        <Box>
          {data.record.map(
            ({ id, title, summary, positive, neutral, negative }) => {
              const feeling = { positive, neutral, negative };

              return (
                <CardWithFeeling
                  key={id}
                  title={title}
                  subTitle={summary}
                  onClick={() =>
                    router.pushWithState(`/${opponent}/${id}`, { feeling })
                  }
                  feeling={feeling}
                />
              );
            }
          )}
        </Box>
      </Box>
      <FloatingUploadButton state={{ opponent }} />
    </PageLayout>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .opponent": { fontSize: "1.3rem", fontWeight: "bold" },
    "& .feelingBox": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
      py: "20px",
      "& .description": { fontSize: "0.875rem", pt: "10px" },
    },
    "& .positive": { color: "var(--color-blue)" },
    "& .negative": { color: "var(--color-red)" },
  },
} satisfies SxStyle;
