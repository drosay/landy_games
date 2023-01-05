import { useState, useEffect } from "react";
import useFetchData from "../../constants/hooks/useFetchData.js";
import { formatImg } from "../../constants/lib/helpers.js";
import { twitch_games_url } from "../../constants/config/keys.js";
import Carousel from "react-material-ui-carousel";
import Covers from "./Covers.jsx";

const Slider = () => {
  const dataResponse = useFetchData;
  const [data, setData] = useState(null);
  const [dataIndex] = useState(Math.round(Math.random() * 10));

  function fillData() {
    const filler = async () => {
      const response = await dataResponse(twitch_games_url);
      setData(
        await Promise.all(
          response.data.map((game) => {
            return (
              <Covers
                key={game.id.toString()}
                url={formatImg(game.box_art_url, 500)}
                name={game.name}
              />
            );
          })
        )
      );
    };
    filler();
  }

  useEffect(fillData, [dataResponse]);

  return (
    <>
      {data ? (
        <Carousel index={dataIndex} indicators={false}>
          {data}
        </Carousel>
      ) : (
        <h1>NO ITEMS YET</h1>
      )}
    </>
  );
};

export default Slider;
