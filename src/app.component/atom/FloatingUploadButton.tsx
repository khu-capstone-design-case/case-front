import { useState, useMemo, useCallback } from "react";
// styles
import {
  Box,
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import type { SxStyle } from "@app.types/app";
// hooks
import { useInternalRouter } from "@app.hooks/route";
import { useLogoutMutation } from "@app.hooks/auth";
// constants
import { UPLOAD_PATH } from "@constant/path";
// components
import { ReactComponent as UploadIcon } from "/public/icon/UploadIcon.svg";

interface FloatingUploadButtonProps {
  uploadState?: Record<string, any>;
}

export default function FloatingUploadButton({
  uploadState,
}: FloatingUploadButtonProps) {
  const [open, setOpen] = useState(false);

  const router = useInternalRouter();
  const { mutateAsync } = useLogoutMutation();

  const actions = useMemo(
    () => [
      {
        icon: <LogoutIcon />,
        name: "로그아웃",
      },
      { icon: <UploadIcon />, name: "대화 추가" },
    ],
    []
  );

  const onClick = useCallback(
    async (action: string) => {
      switch (action) {
        case "로그아웃":
          await mutateAsync();
          break;
        case "대화 추가":
          uploadState
            ? router.pushWithState(UPLOAD_PATH, uploadState)
            : router.push(UPLOAD_PATH);
          break;
        default:
          break;
      }
      setOpen(false);
    },
    [router, mutateAsync, uploadState]
  );

  return (
    <Box sx={styles.container}>
      <SpeedDial
        ariaLabel="Floating Button"
        open={open}
        direction="up"
        icon={<SpeedDialIcon />}
        onClick={() => setOpen((prev) => !prev)}
      >
        {actions.map(({ icon, name }) => (
          <SpeedDialAction
            key={name}
            icon={icon}
            tooltipTitle={name}
            tooltipOpen
            onClick={() => onClick(name)}
          />
        ))}
      </SpeedDial>

      <Backdrop open={open} onClick={() => setOpen(false)} />
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100%",
    position: "sticky",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    cursor: "pointer",
    bottom: 20,
    alignSelf: "flex-end",
    "& .MuiButtonBase-root": {
      bgcolor: "var(--color-primary)",
      boxShadow: 0,
      "&:active": { boxShadow: 0 },
      "&:hover": { bgcolor: "var(--color-primary)" },
      "& > svg": { fill: "#fff", "& > path": { stroke: "#fff" } },
    },
    "& .MuiSpeedDialAction-staticTooltipLabel": {
      whiteSpace: "nowrap",
    },
    "& .MuiBackdrop-root": { bgcolor: "rgba(0,0,0,0.5)", cursor: "auto" },
  },
} satisfies SxStyle;
