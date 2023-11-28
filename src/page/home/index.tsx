// styles
import { Box } from "@mui/material";
import { SxStyle } from "../../types/app/style";
// hooks
import { useInternalRouter } from "@app.hooks/route";
import { useGetUserMain } from "@app.hooks/user";
// components
import CardWithFeeling from "@app.component/template/CardWithFeeling";
import FloatingUploadButton from "@app.component/atom/FloatingUploadButton";
import AppLogo from "@app.component/atom/Logo";

function HomePage() {
  const router = useInternalRouter();
  const { data } = useGetUserMain();

  console.log(data);
  const tempTalker = [
    {
      id: 1,
      opponent: "김진호",
      positive: 30.23,
      neutral: 57.76,
      negative: 10.01,
    },
    {
      id: 2,
      opponent: "경희대학교 LINC 사업단 직원",
      positive: 11.12,
      neutral: 83.75,
      negative: 15.13,
    },
  ];

  return (
    <Box sx={styles.container}>
      <AppLogo width={100} />

      {tempTalker.map(({ id, opponent, positive, neutral, negative }) => (
        <CardWithFeeling
          key={id}
          onClick={() => {
            router.pushWithState(`/${encodeURIComponent(opponent)}`, {
              positive,
              neutral,
              negative,
            });
          }}
          title={opponent}
          feeling={{ positive, neutral, negative }}
        />
      ))}

      <FloatingUploadButton />
    </Box>
  );
}

export default HomePage;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
  },
} satisfies SxStyle;
