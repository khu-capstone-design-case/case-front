import { Typography, type TypographyProps } from "@mui/material";

type AppTextProps = TypographyProps;

export default function AppText(props: AppTextProps) {
  return (
    <Typography
      {...props}
      fontFamily="Pretendard Variable"
      color="var(--color-gray-80)"
    />
  );
}
