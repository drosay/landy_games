import { useState, useEffect } from "react";
import fetchData from "../../services/fetch_Data.js";
import { formatImg } from "../../lib/helpers.js";
import { twitch_games_url } from "../../config/keys.js";
import Carousel from "react-material-ui-carousel";
import { Box, CircularProgress } from "@mui/material";
import styles from "./styles/slider.module.css";

export default function Slider(props) {
  const [data, setData] = useState(null);
  const [dataIndex] = useState(Math.round(Math.random() * 10));

  function fillData() {
    const filler = async () => {
      const response = await fetchData(twitch_games_url);
      const IMG_SIZE = 500;

      setData(
        await Promise.all(
          response?.data?.map((game) => (
            <img
              className={styles.slider__media}
              key={game.id.toString()}
              src={formatImg(game.box_art_url, IMG_SIZE, IMG_SIZE)}
              title={game.name}
              alt={game.name}
            />
          ))
        )
      );
    };
    filler();
  }

  useEffect(fillData, []);

  return (
    <Box className={styles.slider__container}>
      {data ? (
        <Carousel
          className={styles.slider__carousel}
          index={dataIndex}
          indicators={false}
        >
          {data}
        </Carousel>
      ) : (
        <CircularProgress
          className={styles.slider__progress}
          color="secondary"
        />
      )}
    </Box>
  );
}
