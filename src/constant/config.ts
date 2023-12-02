import { Fade } from "@mui/material";
import type { SnackbarProviderProps } from "notistack";
import type { Settings } from "react-slick";

export const snackbarOptions: Omit<SnackbarProviderProps, "children"> = {
  maxSnack: 2,
  autoHideDuration: 1500,
  anchorOrigin: { vertical: "top", horizontal: "center" },
  TransitionComponent: Fade,
};

export const sliderSettings: Settings = {
  arrows: false,
  accessibility: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: false,
  swipe: false,
  infinite: false,
  dots: false,
  lazyLoad: "anticipated",
};
