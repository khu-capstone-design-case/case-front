import { useState } from "react";
// styles
import { Box } from "@mui/material";
// lib
import { API, setSingleFile } from "@lib";

function HomePage() {
  const [file, setFile] = useState<Blob | null>(null);

  const tempBody = {
    opponent: "김진호",
    speakerNum: "2",
    title: "잡담",
  };

  const onSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("opponent", tempBody.opponent);
    formData.append("speakerNum", tempBody.speakerNum);
    formData.append("title", tempBody.title);

    formData.append("file", file);

    const res = await API.POST(
      "http://3.37.25.178:8080/api/record/upload",
      formData,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImppbmhvSWQxQG5hdmVyLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzAwNzI1NTgyLCJleHAiOjE3MDMzMTc1ODJ9.v1HmHqXKaGecc3XIIxPCcNWQIkZuhTcc3FOkt0MuydA",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res);
  };

  return (
    <Box>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setSingleFile(e, setFile)}
      />
      <button type="submit" onClick={onSubmit}>
        버튼
      </button>

      <audio controls style={{ width: "200px", height: "200px" }}>
        <source src="http://3.37.25.178:8080/api/record/record-1.mp3" />
      </audio>
    </Box>
  );
}

export default HomePage;
