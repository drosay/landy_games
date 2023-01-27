import svizualizer from "./styles/vizualizer.module.css";
import sclips from "./styles/clips.module.css";
import { useParams } from "react-router-dom";
import { formatVideo } from "../../lib/helpers";
import { twitch_videos_url } from "../../config/keys";
import { useEffect, useState } from "react";
import fetch_Data from "../../services/fetch_Data.js";
import { formatThumbnail } from "../../lib/helpers";
import { Container, Content, Media } from "./Container";
import { Typography, Box, Skeleton, Grid, Button } from "@mui/material";
import Games from "../common/Games";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Link } from "react-router-dom";

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
      <Container nstyles={svizualizer.vizualizer__container}>
        <Box className={svizualizer.vizualizer__box}>
          <Media nstyles={svizualizer.vizualizer__media}>
            {clip?.videoUrl ? (
              <iframe
                src={clip?.videoUrl}
                title="Clip"
                className={svizualizer.vizualizer__iframe}
              ></iframe>
            ) : (
              <Box className={svizualizer.vizualizer__iframe__box}>
                <Typography sx={{ color: "white" }} variant="h5">
                  The source does not exist
                </Typography>
              </Box>
            )}
          </Media>
          <Content nstyles={svizualizer.vizualizer__content}>
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
        <Clips data={data} gameId={gameId} />
      </Container>
      <Typography
        sx={{ color: "white", textAlign: "center", fontSize: "5vw" }}
        variant="h2"
      >
        OTHER GAMES YOU CAN WATCH
      </Typography>
      <Games />
    </>
  );
}

function Clips({ data, gameId }) {
  const [clips, setClips] = useState(null);

  const fillData = () => {
    setClips(
      data?.map((clip) => (
        <Grid
          item
          key={clip?.id}
          position={"relative"}
          sx={{ textAlign: "center" }}
        >
          <Link to={`/vizualize/${gameId}/${clip?.id}`}>
            <div className={sclips.clips__title}>
              <Typography variant="body1">{clip?.title}</Typography>
            </div>
            <Button className={sclips.clips__button}>
              <PlayArrowRoundedIcon
                sx={{ fontSize: { xs: "15vw", sm: "5vw" } }}
              />
            </Button>

            <img
              style={{ margin: "20px" }}
              src={formatThumbnail(clip?.thumbnail_url, 300, 200)}
              alt={clip?.title}
              title={clip?.title}
              id={clip?.id}
            />
          </Link>
        </Grid>
      ))
    );
  };

  useEffect(fillData, [data, gameId]);

  return (
    <>
      <Grid container className={sclips.clips__grid}>
        {clips ? clips : <Skeleton sx={{ width: 300, height: 400 }} />}
      </Grid>
    </>
  );
}
