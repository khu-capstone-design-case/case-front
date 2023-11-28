import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import { CssBaseline, ThemeProvider } from "@mui/material";
// styles
import { GlobalStyles } from "./app.style/GlobalStyle";
// configs
import { snackbarOptions } from "./constant/config";
// route
import router from "./router";
// layout
import Layout from "./app.layout/Layout";
import theme from "@app.style/theme";

const isDev = process.env.NODE_ENV === "development";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider {...snackbarOptions}>
          <Layout>
            <RouterProvider router={router} />
            <CssBaseline />
            <GlobalStyles />
          </Layout>
        </SnackbarProvider>
        {isDev && <ReactQueryDevtools buttonPosition="bottom-left" />}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
