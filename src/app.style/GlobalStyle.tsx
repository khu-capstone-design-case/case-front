import { Global, css } from "@emotion/react";

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
        * {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          ::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
          }
        }
        .notistack-MuiContent-default {
          display: flex;
          justify-content: center;
        }
      `}
    />
  );
}
