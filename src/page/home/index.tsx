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

  return (
    <Box sx={styles.container}>
      <AppLogo width={100} />

      {data?.talker.map(({ id, opponent, positive, neutral, negative }) => (
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
