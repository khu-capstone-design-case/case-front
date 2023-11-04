import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
// styles
import { GlobalStyles } from "./app.style/GlobalStyle";
// configs
import { snackbarOptions } from "./constant/config";
// route
import router from "./router";
// layout
import Layout from "./app.layout/Layout";

function App() {
  return (
    <SnackbarProvider {...snackbarOptions}>
      <Layout>
        <RouterProvider router={router} />
        <CssBaseline />
        <GlobalStyles />
      </Layout>
    </SnackbarProvider>
  );
}

export default App;
