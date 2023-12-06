import { Chip, type ChipProps } from "@mui/material";

type AppChipProps = ChipProps;

export default function AppChip(props: AppChipProps) {
  return (
    <Chip
      {...props}
      sx={{
        bgcolor: "#f6f6f6",
        color: "#9D9D9D",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "-0.36px",
        height: "auto",
        p: "3px 6px",
        "& .MuiChip-label": { p: 0 },
        ...props.sx,
      }}
    />
  );
}
