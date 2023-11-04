import { Fade } from "@mui/material";
import { SnackbarProviderProps } from "notistack";

export const snackbarOptions: Omit<SnackbarProviderProps, "children"> = {
  maxSnack: 2,
  autoHideDuration: 1500,
  anchorOrigin: { vertical: "top", horizontal: "center" },
  TransitionComponent: Fade,
};
