import { LoadingButton, type LoadingButtonProps } from "@mui/lab";

interface AppButtonProps extends Omit<LoadingButtonProps, "color"> {
  color?: string;
  bgcolor?: string;
}

export default function AppButton({
  color = "#fff",
  bgcolor = "var(--color-primary)",
  ...props
}: AppButtonProps) {
  return (
    <LoadingButton
      {...props}
      sx={{
        color,
        bgcolor,
        "&:hover": { color, bgcolor },
        "& .MuiCircularProgress-root": { color: "white" },
        "&:disabled": { bgcolor: "#EDEDED" },
        borderRadius: "8px",
        ...props.sx,
      }}
    />
  );
}
