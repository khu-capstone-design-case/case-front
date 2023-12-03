import { useEffect } from "react";
// styles
import { Box } from "@mui/material";
import type { SxStyle } from "@app.types/app";
import ModalPortal from "@app.layout/portal";

interface AppModalProps {
  open: boolean;
  title?: string;
  type: "alert" | "confirm";
  btn1Text?: string;
  btn2Text?: string;
  btn1Handler?: (param?: any) => void;
  btn2Handler?: (param?: any) => void;
  children?: React.ReactNode;
}

export default function AppModal(props: AppModalProps) {
  const {
    open,
    title,
    type,
    btn1Text,
    btn2Text,
    btn1Handler,
    btn2Handler,
    children,
  } = props;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    open && (
      <ModalPortal>
        <Box sx={styles.container}>
          <Box className="modalContent">
            <Box className="content">
              {title && <span className="title">{title}</span>}
              {children}
            </Box>
            {type === "alert" ? (
              <Box className="singleBtnArea">
                <Box className="button" onClick={btn1Handler}>
                  {btn1Text}
                </Box>
              </Box>
            ) : (
              <Box className="dualBtnArea">
                <Box className="button dual" onClick={btn1Handler}>
                  {btn1Text}
                </Box>
                <Box className="button dual" onClick={btn2Handler}>
                  {btn2Text}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </ModalPortal>
    )
  );
}

const styles = {
  container: {
    display: "flex",
    position: "absolute",
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
    "& .modalContent": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: "8px",
      padding: "20px",
      width: "300px",
      height: "fit-content",
      backgroundColor: "#fff",
    },
    "& .content": {
      display: "flex",
      flexDirection: "column",
      padding: "20px 20px 30px 20px",
      height: "100%",
    },
    "& .title": {
      color: "#525252",
      fontWeight: "bold",
      fontSize: "1.45rem",
      marginBottom: "15px",
    },
    " & .singleBtnArea": {
      display: "flex",
      justifyContent: "flex-end",
      fontWeight: 500,
    },
    "& .dualBtnArea": {
      display: "flex",
      justifyContent: "center",
    },
    "& .button": {
      cursor: "pointer",
    },
    "& .dual": {
      width: "50%",
      textAlign: "center",
    },
  },
} satisfies SxStyle;
