import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./styles/clip.module.css"; //TODO:  Make good styles
import useVideoClip from "../../hooks/useVideoClip";
import { useParams } from "react-router-dom";
import { formatVideo } from "../../lib/helpers";
import { twitch_videos_url } from "../../config/keys";
import { useEffect, useState } from "react";
import fetch_Data from "../../services/fetch_Data.js";

export default function Clips() {
  //TODO: complete the component, make componento both, with gameId and with videoId
  const [clip, setClip] = useState(null); //object
  const { gameId, videoId } = useParams();

  const fillData = () => {
    const getData = async () => {
      if (videoId) {
        const response = await fetch_Data(`${twitch_videos_url}id=${videoId}`);
        const clipData = await response?.data[0];
        console.log(clipData)
        return setClip({ videoUrl: formatVideo(clipData?.id), ...clipData });
      }
    };
    getData();
  };

  useEffect(fillData, [videoId]);

  return (
    <Card className={styles.clip__container}>
      <CardMedia className={styles.clip__media}>
        <iframe
          src={clip?.videoUrl}
          title="Clip"
          className={styles.clip__iframe}
        ></iframe>
      </CardMedia>
      <CardContent className={styles.clip__details}></CardContent>
    </Card>
  );
}
