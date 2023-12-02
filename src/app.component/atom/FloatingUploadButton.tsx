// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle } from "../../types/app";
// hooks
import { useInternalRouter, type RoutePath } from "@app.hooks/route";
// constants
import { UPLOAD_PATH } from "@constant/path";
// components
import { ReactComponent as UploadIcon } from "/public/icon/UploadIcon.svg";

interface FloatingUploadButtonProps {
  routeTo?: RoutePath;
  state?: Record<string, any>;
}

export default function FloatingUploadButton({
  routeTo = UPLOAD_PATH,
  state,
}: FloatingUploadButtonProps) {
  const router = useInternalRouter();

  return (
    <Box
      className="floating-button"
      aria-label="add"
      onClick={() =>
        state ? router.pushWithState(routeTo, state) : router.push(routeTo)
      }
      sx={styles.container}
    >
      <UploadIcon />
      <Typography>New</Typography>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    bottom: 20,
    right: 20,
    width: "56px",
    height: "56px",
    borderRadius: "999px",
    bgcolor: "var(--color-primary)",
    "& > svg": { p: "2px", "& > path": { stroke: "#fff" } },
    "& > p": { color: "#fff", fontSize: "12px", letterSpacing: "-0.6px" },
  },
} satisfies SxStyle;
