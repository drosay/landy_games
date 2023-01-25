import styles from "./styles/clip.module.css";
import { useParams } from "react-router-dom";
import { formatVideo } from "../../lib/helpers";
import { twitch_videos_url } from "../../config/keys";
import { useEffect, useState } from "react";
import fetch_Data from "../../services/fetch_Data.js";
import { formatThumbnail } from "../../lib/helpers";
import { Container, Content, Media } from "./Container";
import { Typography, Box, Skeleton, Grid } from "@mui/material";
import Games from "../common/Games";

export default function Vizualizer() {
  const [clip, setClip] = useState(null);
  const [data, setData] = useState(null);
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

      setData(await Promise.all(response?.data));
    };

    getData();
    window.scrollTo(0, 0);
  };

  useEffect(fillData, [videoId, gameId]);

  return (
    <>
      {/* for Container, Media and Content the keyword className does not works, so i use nstyle to add class names like a prop */}
      <Container nstyles={styles.clip__container}>
        <Box className={styles.clip__box}>
          <Media nstyles={styles.clip__media}>
            {clip?.videoUrl ? (
              <iframe
                src={clip?.videoUrl}
                title="Clip"
                className={styles.clip__iframe}
              ></iframe>
            ) : (
              <Box className={styles.clip__iframe__box}>
                <Typography sx={{ color: "white" }} variant="h5">
                  The source does not exist
                </Typography>
              </Box>
            )}
          </Media>
          <Content nstyles={styles.clip__content}>
            {clip?.title !== "" ? (
              <Typography variant="h5">{clip?.title}</Typography>
            ) : (
              <Skeleton width="60%" height={30} />
            )}
            {clip?.user_name !== "" ? (
              <Typography variant="body1">{clip?.user_name}</Typography>
            ) : (
              <Skeleton width="40%" height={10} />
            )}
            {clip?.description !== "" ? (
              <Typography variant="body2">{clip?.description}</Typography>
            ) : (
              <>
                <Typography variant="body2">
                If you see this, the streamer did not put any description.
                  <br />
                  <br />
                  Very lazy...
                </Typography>
              </>
            )}
          </Content>
        </Box>
        <Clips data={data} />
      </Container>
      <Typography sx={{ color: "white", textAlign:'center',fontSize:'5vw'}} variant="h2">
        OTHER GAMES THAT YOU CAN WATCH
      </Typography>
      <Games />
    </>
  );
}

function Clips({ data }) {
  const [clips, setClips] = useState(null);

  const fillData = () => {
    console.log(data);
    setClips(
      data?.map((clip) => (
        <Grid item key={clip?.id}>
          <img
            style={{ margin: 20 }}
            src={formatThumbnail(clip?.thumbnail_url, 300, 200)}
            alt={clip?.title}
            title={clip?.title}
            id={clip?.id}
          />
        </Grid>
      ))
    );
  };
  useEffect(fillData, [data]);

  return (
    <>
      <Grid container className={styles.clip__grid}>
        {clips}
      </Grid>
    </>
  );
}
