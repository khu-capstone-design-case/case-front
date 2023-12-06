// styles
import { Box, type SxProps } from "@mui/material";
import type { SxStyle } from "@app.type/app";

interface DotsHeaderProps {
  curPage: number;
  maxPage?: number;
  sx?: SxProps;
}

export default function DotsHeader({
  curPage,
  maxPage = 2,
  sx,
}: DotsHeaderProps) {
  return (
    <Box sx={{ ...styles.container, ...sx }}>
      {[...new Array(maxPage)].map((_, idx) => (
        <Box
          key={idx}
          className="dot"
          bgcolor={curPage === idx ? "var(--color-primary-deep)" : "#D9D9D9"}
        />
      ))}
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    "& .dot": {
      width: "8px",
      height: "8px",
      borderRadius: "999px",
      marginRight: "8px",
    },
  },
} satisfies SxStyle;
