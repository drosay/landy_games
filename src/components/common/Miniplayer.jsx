import { useState, useEffect } from "react";
import { useMiniplayerContext } from "../../context/MiniplayerContext.jsx";
import { twitch_videos_url } from "../../config/keys.js";
import { formatVideo } from "../../lib/helpers.js";
import { Typography, Button, ButtonGroup } from "@mui/material";
import fetch_Data from "../../services/fetch_Data.js";
import styles from "./styles/miniplayer.module.css";

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
    if (videoId) getVideoUrl();
  };

  const handleClick = () => {
    setVideoId(null);
    setVideoUrl(null);
  };
  useEffect(fillData, [videoId, videoUrl]);

  return videoUrl ? (
    <div className={styles.miniplayer__container}>
      <div className={styles.miniplayer__control}>
        <ButtonGroup variant="contained" className={styles.miniplayer__btnGroup}>
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
        className={styles.miniplayer__iframe}
      ></iframe>
    </div>
  ) : (
    <Typography variant="h5">No video yet</Typography>
  );
}
