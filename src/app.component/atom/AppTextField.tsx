import { forwardRef, type ForwardedRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";

type AppTextFieldProps = TextFieldProps;

function AppTextField(
  props: AppTextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <TextField
      {...props}
      sx={{ ...style, ...props.sx }}
      autoComplete="off"
      ref={ref}
    />
  );
}

export default forwardRef(AppTextField);

const style = {
  "& .MuiInputBase-root": {
    bgcolor: "var(--color-gray-10)",
    borderRadius: "8px",
    "& *": { border: "none" },
  },
};
