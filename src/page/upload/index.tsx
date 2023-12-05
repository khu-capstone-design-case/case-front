import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import Slider from "react-slick";
// styles
import { Box } from "@mui/material";
import { sliderSettings } from "@constant/config";
// constants
import { HOME_PATH } from "@constant/path";
// hooks
// import {
//   useUploadInitMutation,
//   useUploadAnalyzeMutation,
// } from "@app.hooks/upload";
import { useInternalRouter } from "@app.hooks/route";
// types
import type { uploadFormState, SxStyle } from "@app.types/app";
// components
import DotsHeader from "@app.component/molecule/DotsHeader";
import PageWithGoBack from "@app.layout/PageWithGoBack";
import UploadVoicePage from "@app.component/page/upload/UploadVoicePage";
import UploadTitle from "@app.component/page/upload/UploadTitle";
import UploadOpponent from "@app.component/page/upload/UploadOpponent";

export default function UploadPage() {
  const router = useInternalRouter();
  const { state } = useLocation();
  const { formState, ...form } = useForm<uploadFormState>({
    defaultValues: {
      title: "",
      opponent: state?.opponent ?? "",
      speakerNum: 2,
    },
  });

  const [curPage, setCurPage] = useState(0);
  const sliderRef = useRef<Slider>(null);
  // const { mutateAsync: mutateInit, isPending } = useUploadInitMutation();
  // const { mutateAsync: mutateAnalyze } = useUploadAnalyzeMutation();

  const onSubmit: SubmitHandler<uploadFormState> = async () => {
    try {
      // const res = await mutateInit(data);
      // await mutateAnalyze(res);
      router.replace(HOME_PATH);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const preventEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", preventEnter);
  }, []);

  return (
    <PageWithGoBack
      onClick={() => {
        switch (curPage) {
          case 0:
            router.goBack();
            break;
          default:
            sliderRef.current?.slickPrev();
            break;
        }
      }}
    >
      <FormProvider formState={formState} {...form}>
        <form
          onSubmit={(e) => {
            form.clearErrors();
            form.handleSubmit(onSubmit)();
            e.preventDefault();
            return false;
          }}
          style={styles.form}
        >
          <Box sx={styles.container}>
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
              <UploadVoicePage sliderRef={sliderRef} />

              <UploadTitle sliderRef={sliderRef} />

              <UploadOpponent isPending={false} />
            </Slider>
          </Box>
        </form>
      </FormProvider>
    </PageWithGoBack>
  );
}

const styles = {
  form: { width: "100%", height: "100%" },
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
