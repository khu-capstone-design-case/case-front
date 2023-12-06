import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import { CssBaseline, ThemeProvider } from "@mui/material";
// styles
import { GlobalStyles } from "./app.style/GlobalStyle";
import theme from "@app.style/theme";
// configs
import { snackbarOptions } from "./constant/config";
// route
import Router from "./router";

// const isDev = process.env.NODE_ENV === "development";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider {...snackbarOptions}>
          <Router />
          <CssBaseline />
          <GlobalStyles />
        </SnackbarProvider>
        {/* {isDev && <ReactQueryDevtools buttonPosition="bottom-left" />} */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
