import { useState, useEffect } from "react";
import Game from "./Game.jsx";
import { Grid, Skeleton } from "@mui/material";
import "./styles/games.css";
import { twitch_games_url } from "../../constants/config/keys.js";
import fetch_Data from "../../constants/services/fetch_Data.js";

function Games() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const skeletons = () =>
    "my nuevito esqueleto".split("").map((item, index) => (
      <Grid item key={index.toString()}>
        <Skeleton variant="rounded" animation="wave">
          <div className="game__card"></div>
        </Skeleton>
      </Grid>
    ));

  const fillData = () => {
    async function filler() {
      const response = await fetch_Data(twitch_games_url);
      setData(
        await Promise.all(
          response.data.map((game) => (
            <Grid item key={game.id.toString()}>
              <Game
                gameId={game.id}
                imgUrl={game.box_art_url}
                name={game.name}
              />
            </Grid>
          ))
        )
      );
      setLoading(false);
    }

    filler();
  };

  useEffect(fillData, []);

  return (
    <Grid
      id="games"
      justifyContent="center"
      alignItems="flex-start"
      container
      spacing={5}
    >
      {loading ? skeletons() : data}
    </Grid>
  );
}

export default Games;
