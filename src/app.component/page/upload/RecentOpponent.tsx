import { Swiper, SwiperSlide } from "swiper/react";
import { useFormContext } from "react-hook-form";
// styles
import { Box, Typography } from "@mui/material";
import type { SxStyle, uploadFormState } from "@app.types/app";
// components
import AppChip from "@app.component/atom/AppChip";

interface RecentOpponentProps {
  opponents: string[];
}

export default function RecentOpponent({ opponents }: RecentOpponentProps) {
  const { setValue, watch } = useFormContext<uploadFormState>();

  const opponent = watch("opponent");

  return (
    <Box sx={styles.container}>
      <Typography className="title">최근 대화 상대</Typography>

      <Box width="calc(100% - 75px)">
        <Swiper slidesPerView={5.5} loop={false} direction="horizontal">
          {opponents.map((name) => (
            <SwiperSlide key={name}>
              <AppChip
                label={name}
                sx={{
                  ...styles.chip,
                  ...(opponent === name && {
                    color: "white",
                    bgcolor: "var(--color-primary)",
                    "&:hover": { bgcolor: "var(--color-primary)" },
                  }),
                }}
                onClick={() =>
                  setValue("opponent", opponent === name ? "" : name)
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    p: "8px 0 0 16px",
    overflow: "scroll",
    "& .swiper-wrapper": { width: "100%" },
    "& .title": {
      width: "65px",
      whiteSpace: "nowrap",
      color: "#ADADAD",
      fontSize: "12px",
      fontWeight: 500,
      letterSpacing: "-0.6px",
      mr: "10px",
    },
  },
  chip: {
    bgcolor: "#fff",
    color: "#7D7D7D",
    fontWeight: 600,
    cursor: "pointer",
  },
} satisfies SxStyle;
