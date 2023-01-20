import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./styles/clip.module.css"; //TODO:  Make good styles
import useVideoClip from "../../hooks/useVideoClip";
import { useParams } from "react-router-dom";
import { formatVideo } from "../../lib/helpers";
import { twitch_videos_url } from "../../config/keys";
import { useEffect, useState } from "react";
import fetch_Data from "../../services/fetch_Data.js";
import { formatThumbnail } from "../../lib/helpers";

export default function Clips() {
  const [clip, setClip] = useState(null);
  const [clips, setClips] = useState(null);
  const { gameId, videoId } = useParams();

  const fillData = () => {
    const getData = async () => {
      
      const response = await fetch_Data(
        `${twitch_videos_url}game_id=${gameId}&language=en&type=highlight&first=20`
      );

      if (!videoId) {
        const clipData = await response?.data?.shift();
        setClip({ videoUrl: formatVideo(clipData?.id), ...clipData });
      } else {
        const response = await fetch_Data(`${twitch_videos_url}id=${videoId}`);
        const clipData = await response?.data[0];
        setClip({ videoUrl: formatVideo(clipData?.id), ...clipData });
      }

      setClips(
        await Promise.all(
          response?.data.map((item) => {
            //TODO: Set appropiate component
            return (
              <img
              style={{margin:20}}
                key={item.id}
                src={formatThumbnail(item.thumbnail_url, 300, 200)}
                alt={item.title}
                title={item.title}
                id={item.id}
              />
            );
          })
        )
      );
    };

    getData();
  };

  useEffect(fillData, [videoId, gameId]);

  //set appropiate component
  return (
    <>
      <Card className={styles.clip__container}>
        <CardMedia className={styles.clip__media}>
          {clip?.videoUrl ? (
            <iframe
              src={clip?.videoUrl}
              title="Clip"
              className={styles.clip__iframe}
            ></iframe>
          ) : (
            <h1>There is no video, please view another</h1>
          )}
        </CardMedia>
        <CardContent className={styles.clip__details}></CardContent>
      </Card>
      <div>{clips}</div>
    </>
  );
}
