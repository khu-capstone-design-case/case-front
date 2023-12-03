import { Global, css } from "@emotion/react";
import "react-h5-audio-player/lib/styles.css";

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        #root {
          background-color: bisque;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        a,
        a:visited {
          color: inherit;
          text-decoration: none;
        }
        * {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          ::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
          }
          font-family: "Pretendard Variable", Pretendard, -apple-system,
            BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
            "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        }
        .notistack-MuiContent-default {
          display: flex;
          justify-content: center;
        }
      `}
    />
  );
}
