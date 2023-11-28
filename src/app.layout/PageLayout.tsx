// hooks
import { RoutePath } from "@app.hooks/route";
// styles
import { Box, type SxProps } from "@mui/material";
// components
import Spacer from "@app.component/atom/Spacer";

interface PageLayoutProps {
  to?: RoutePath;
  children?: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <Box style={style}>
      <Spacer y={30} />
      {/* <ArrowBackIosIcon
        onClick={() => (to ? router.push(to) : router.goBack())}
        sx={{ cursor: "pointer" }}
      />
      <Spacer y={30} /> */}
      {children}
    </Box>
  );
}

const style = {
  width: "100%",
  height: "100%",
  padding: "20px",
  position: "relative",
} satisfies SxProps;
