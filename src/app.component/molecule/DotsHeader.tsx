import { Box, type SxProps } from "@mui/material";
import type { SxStyle } from "../../types/app";

interface DotsHeaderProps {
  curPage: number;
  maxPage?: number;
  sx?: SxProps;
}

const DotsHeader = ({ curPage, maxPage = 2, sx }: DotsHeaderProps) => {
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
};

export default DotsHeader;

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
