import { LoadingButton, LoadingButtonProps } from "@mui/lab";

interface AppButtonProps extends Omit<LoadingButtonProps, "color"> {
  color?: string;
  bgcolor?: string;
}

export default function AppButton({
  color = "var(--color-gray-20)",
  bgcolor = "var(--color-blue)",
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
        borderRadius: "8px",
        ...props.sx,
      }}
    />
  );
}
