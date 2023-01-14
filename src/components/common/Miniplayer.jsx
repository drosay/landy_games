import { useState, useEffect } from "react";
import { useMiniplayerContext } from "../../context/MiniplayerContext.jsx";
import { twitch_videos_url } from "../../config/keys.js";
import { formatVideo } from "../../lib/helpers.js";
import { Typography, Button, ButtonGroup } from "@mui/material";
import fetch_Data from "../../services/fetch_Data.js";

//TODO:Use css modules
const styles = {
  width: "600px",
  height: "400px",
  backgroundColor: "black",
  position: "fixed",
  bottom: 20,
  right: 20,
  zIndex: 2,
};

export default function Miniplayer() {
  const [videoUrl, setVideoUrl] = useState(null);
  const { videoId, setVideoId } = useMiniplayerContext();

  const fillData = () => {
    const getVideoUrl = async () => {
      const response = await fetch_Data(
        `${twitch_videos_url}game_id=${videoId}&first=1&language=en`
      );
      setVideoUrl(formatVideo(response?.data[0]?.id));
    };
    videoId ? getVideoUrl() : console.log("There is no video");
  };

  const handleClick = () => {
    setVideoId(null);
    setVideoUrl(null);
  };
  useEffect(fillData, [videoId, videoUrl]);

  return videoUrl ? (
    <div style={styles}>
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "400px",
          backgroundColor: "transparent",
        }}
      >
        <ButtonGroup
          variant="contained"
          sx={{ position: "inherit", right: 0, margin: 2 }}
        >
          <Button onClick={handleClick} color="secondary">
            Reproducir en otra ventana
          </Button>
          <Button onClick={handleClick} color="error">
            Close
          </Button>
        </ButtonGroup>
      </div>
      <iframe
        src={videoUrl}
        title="Miniplayer"
        height={400}
        width={600}
      ></iframe>
    </div>
  ) : (
    <Typography variant="h5">No video yet</Typography>
  );
}
