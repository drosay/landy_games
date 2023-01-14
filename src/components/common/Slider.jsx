import { useState, useEffect } from "react";
import fetchData from '../../services/fetch_Data.js'
import {formatImg} from "../../lib/helpers.js";
import { twitch_games_url } from "../../config/keys.js";
import Carousel from "react-material-ui-carousel";
import Cover from "./Cover.jsx";
import { Skeleton } from "@mui/material";

const styles = {
  carousel: { height: { xs: "50vh", sm: "40vw" } },
  skeleton: {
    height: { xs: "50vh", sm: "40vw" },
    width: { xs: "100vw", sm: "40vw" },
  },
};

const Slider = () => {
  const [data, setData] = useState(null);
  const [dataIndex] = useState(Math.round(Math.random() * 10));

  function fillData() {
    const filler = async () => {
      const response = await fetchData(twitch_games_url);
      setData(
        await Promise.all(
          response.data.map((game) => {
            return (
              <Cover
                key={game.id.toString()}
                url={formatImg(game.box_art_url, 500, 500)}
                name={game.name}
              />
            );
          })
        )
      );
    };
    filler();
  }

  useEffect(fillData, []);

  return (
    <>
      {data ? (
        <Carousel sx={styles.carousel} index={dataIndex} indicators={false}>
          {data}
        </Carousel>
      ) : (
        <Skeleton animation="wave" sx={styles.skeleton}></Skeleton>
      )}
    </>
  );
};

export default Slider;
