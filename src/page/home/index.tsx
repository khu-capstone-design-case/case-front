import { useState } from "react";
// styles
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// constants
import { UPLOAD_PATH } from "@constant/path";

import { useInternalRouter } from "@app.hooks/route";
import { useGetUserMain } from "@app.hooks/user";

function HomePage() {
  const router = useInternalRouter();
  const { data } = useGetUserMain();
  console.log(data);

  return (
    <Box sx={styles.container}>
      Home
      <Fab
        className="floating-button"
        color="primary"
        aria-label="add"
        onClick={() => router.push(UPLOAD_PATH)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default HomePage;

const styles = {
  container: {
    position: "relative",
    height: "100%",
    "& .floating-button": {
      position: "absolute",
      bottom: 20,
      right: 20,
    },
  },
};
