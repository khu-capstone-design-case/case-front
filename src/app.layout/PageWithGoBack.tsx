// hooks
import { RoutePath, useInternalRouter } from "@app.hooks/route";
// styles
import { Box, type SxProps } from "@mui/material";
// components
import { ReactComponent as ArrowBackIcon } from "/public/icon/ArrowBack.svg";

interface PageWithGoBackProps {
  onClick?: () => void;
  to?: RoutePath;
  children?: React.ReactNode;
}

export default function PageWithGoBack({
  onClick,
  to,
  children,
}: PageWithGoBackProps) {
  const router = useInternalRouter();

  return (
    <Box style={styles.container}>
      <ArrowBackIcon
        onClick={() => {
          if (onClick) {
            onClick?.();
            return;
          }
          to ? router.push(to) : router.goBack();
        }}
        className="back"
        style={styles.button}
      />
      {children}
    </Box>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 0,
  },
  button: {
    cursor: "pointer",
    position: "absolute",
    top: 20,
    left: 0,
    zIndex: 1,
  },
} satisfies SxProps;
