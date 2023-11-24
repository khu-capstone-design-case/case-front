import { TextField, TextFieldProps } from "@mui/material";

type AppTextFieldProps = TextFieldProps;

export default function AppTextField(props: AppTextFieldProps) {
  return (
    <TextField {...props} sx={{ ...style, ...props.sx }} autoComplete="off" />
  );
}

const style = {
  "& .MuiInputBase-root": {
    bgcolor: "var(--color-gray-10)",
    borderRadius: "8px",
    "& *": { border: "none" },
  },
};
