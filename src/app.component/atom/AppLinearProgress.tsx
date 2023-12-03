import { LinearProgress, LinearProgressProps } from "@mui/material";

type AppLinearProgressProps = LinearProgressProps;

export default function AppLinearProgress(props: AppLinearProgressProps) {
  return (
    <LinearProgress
      {...props}
      sx={{
        bgcolor: "var(--color-primary-light) !important",
        borderRadius: "8px",
        "& .MuiLinearProgress-bar": {
          bgcolor: "var(--color-primary) !important",
        },
        ...props.sx,
      }}
    />
  );
}
