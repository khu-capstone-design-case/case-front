import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
// hooks
import { useInternalRouter, type RoutePath } from "@app.hooks/route";
// constants
import { UPLOAD_PATH } from "@constant/path";

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
    <Fab
      className="floating-button"
      color="primary"
      aria-label="add"
      onClick={() =>
        state ? router.pushWithState(routeTo, state) : router.push(routeTo)
      }
      sx={{
        position: "absolute",
        bottom: 20,
        right: 20,
      }}
    >
      <AddIcon />
    </Fab>
  );
}
