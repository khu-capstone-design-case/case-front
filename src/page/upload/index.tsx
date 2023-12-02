import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import Slider from "react-slick";
// styles
import { FormControl } from "@mui/material";
import { sliderSettings } from "@constant/config";
// hooks
import { useUploadMutation } from "@app.hooks/upload";
// types
import type { uploadFormState, SxStyle } from "../../types/app";
// components
import DotsHeader from "@app.component/molecule/DotsHeader";
import PageWithGoBack from "@app.layout/PageWithGoBack";
import UploadVoicePage from "./component/UploadVoicePage";
import UploadTitle from "./component/UploadTitle";
import UploadOpponent from "./component/UploadOpponent";

export default function UploadPage() {
  const { state } = useLocation();
  const { formState, ...form } = useForm<uploadFormState>({
    defaultValues: { opponent: state?.opponent ?? "", speakerNum: 2 },
  });

  const [curPage, setCurPage] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const { mutateAsync, isPending } = useUploadMutation();

  const onSubmit: SubmitHandler<uploadFormState> = async (data) => {
    try {
      await mutateAsync(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FormProvider formState={formState} {...form}>
      <FormControl
        sx={styles.container}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(onSubmit);
        }}
      >
        <DotsHeader
          curPage={curPage}
          maxPage={3}
          sx={{ position: "absolute", top: 28 }}
        />

        <Slider
          {...sliderSettings}
          ref={sliderRef}
          beforeChange={(_, next) => setCurPage(next)}
        >
          <PageWithGoBack>
            <UploadVoicePage sliderRef={sliderRef} />
          </PageWithGoBack>

          <PageWithGoBack onClick={() => sliderRef.current?.slickPrev()}>
            <UploadTitle sliderRef={sliderRef} />
          </PageWithGoBack>

          <PageWithGoBack onClick={() => sliderRef.current?.slickPrev()}>
            <UploadOpponent isPending={isPending} />
          </PageWithGoBack>
        </Slider>
      </FormControl>
    </FormProvider>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    "& .slick-slider, .slick-list, .slick-track, .slick-slide, .slick-slide > div":
      {
        height: "100%",
      },
    "& .back + *": {
      pt: "60px",
    },
    "& .input": {
      width: "100%",
      "& input::placeholder": {
        color: "#ADADAD",
        fontSize: "20px",
        fontWeight: 600,
        letterSpacing: "-1px",
      },
    },
    "& .mainText": {
      width: "100%",
      color: "#535353",
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "32px",
      letterSpacing: "-1.2px",
    },
    "& .subText": {
      color: "#ADADAD",
      fontSize: "16px",
      fontWeight: 500,
      letterSpacing: "-0.8px",
    },
    "& .nextButton": {
      position: "absolute",
      bottom: 50,
      width: "288px",
      height: "52px",
      borderRadius: "26px",
      color: "#fff",
      fontSize: "20px",
      fontWeight: 600,
    },
  },
} satisfies SxStyle;
