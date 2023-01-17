import { useState, useEffect } from "react";
import { useMiniplayerContext } from "../../context/MiniplayerContext.jsx";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./styles/miniplayer.module.css";
import useVideoClip from "../../hooks/useVideoClip.js";

export default function Miniplayer() {
  const [videoUrl, setVideoUrl] = useState(null);
  const { gameId, removeGameId } = useMiniplayerContext();
  //useVideoClip hook returns an object, so we catch videoUrl  as url value with videoId state who changes in every render
  const { videoUrl: url, id: videoId } = useVideoClip(gameId);
  const handleClick = () => {
    removeGameId(); //remove the id so the url become null
    setVideoUrl(null); //set the state to null to avoid errors
  };

  useEffect(() => {
    setVideoUrl(url);
  }, [url]);

  return videoUrl ? (
    <div className={styles.miniplayer__container}>
      <div className={styles.miniplayer__control}>
        <ButtonGroup
          size="small"
          variant="contained"
          className={styles.miniplayer__btnGroup}
        >
          <Button onClick={handleClick} color="secondary">
            <Link to={`/clips/${gameId}/${videoId}`}>
              Reproducir en otra ventana
            </Link>
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
    <></>
  );
}
