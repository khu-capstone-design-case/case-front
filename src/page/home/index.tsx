// import { useState } from "react";
// styles
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// constants
import { UPLOAD_PATH } from "@constant/path";

import { useInternalRouter } from "@app.hooks/route";
import { useGetUserMain } from "@app.hooks/user";

function HomePage() {
  const router = useInternalRouter();
  const { data } = useGetUserMain();

  console.log(data);
  const tempTalker = [
    {
      id: 1,
      opponent: "경희대학교 컴퓨터공학과 행정실 직원",
      positive: 12.23,
      neutral: 77.76,
      negative: 10.01,
    },
    {
      id: 2,
      opponent: "경희대학교 LINC 사업단 직원",
      positive: 11.12,
      neutral: 83.75,
      negative: 15.13,
    },
  ];

  return (
    <Box sx={styles.container}>
      {tempTalker.map(({ id, opponent, positive, neutral, negative }) => (
        <Card key={id}>
          <CardActionArea>
            <CardContent>
              <Typography className="opponent">{opponent}</Typography>
              <Box>
                <Typography className="feeling positive">
                  {positive}%
                </Typography>
                <Typography className="feeling neutral">{neutral}%</Typography>
                <Typography className="feeling negative">
                  {negative}%
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    "& .floating-button": {
      position: "absolute",
      bottom: 20,
      right: 20,
    },
    "& .MuiCard-root": {
      marginBottom: "20px",
    },
    "& .MuiCardActionArea-root": {
      width: 345,
      minHeight: 100,
    },
    "& .MuiCardContent-root": {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      "& .opponent": { fontSize: "0.875rem", fontWeight: 500 },
      "& .feeling": { fontSize: "0.75rem", fontWeight: 600 },
      "& .positive": { color: "var(--color-blue)" },
      "& .neutral": { color: "var(--color-yellow)" },
      "& .negative": { color: "var(--color-red)" },
    },
  },
};
