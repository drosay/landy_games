import { useState, useEffect } from "react";
import { useMiniplayerContext } from "../../context/MiniplayerContext.jsx";
import { twitch_games_url } from "../../config/keys.js";
import { formatImg } from "../../lib/helpers.js";
import { Link } from "react-router-dom";
import fetch_Data from "../../services/fetch_Data.js";
import PropTypes from "prop-types";
import styles from "./styles/game.module.css";
import {
  Grid,
  LinearProgress,
  Button,
  ButtonGroup,
  Typography,
} from "@mui/material";

export default function Games() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fillData = () => {
    async function filler() {
      const response = await fetch_Data(twitch_games_url);
      setData(
        await Promise.all(
          response?.data?.map((game) => (
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

  return loading ? (
    <LinearProgress color="secondary" />
  ) : (
    <Grid
      id="games"
      justifyContent="center"
      alignItems="flex-start"
      container
      spacing={5}
    >
      {data}
    </Grid>
  );
}

function Game({ gameId, imgUrl, imgSize, name }) {
  const { setGameId } = useMiniplayerContext();

  imgUrl = formatImg(imgUrl);

  const handleClick = () => {
    setGameId(gameId);
  };

  return (
    <div className={styles.card__container} id={gameId}>
      <div className={styles.card__content}>
        <Typography variant="h2" className={styles.card__title}>
          {name}
        </Typography>
        <ButtonGroup
          orientation="vertical"
          color="secondary"
          variant="contained"
          size="small"
        >
          <Button onClick={handleClick}>Play Last clip</Button>
          <Button>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/clips/${gameId}`}
            >
              Latest Clips
            </Link>
          </Button>
        </ButtonGroup>
      </div>
      <img
        className={styles.card__media}
        src={imgUrl}
        title={name}
        alt={name}
      />
    </div>
  );
}

Game.propTypes = {
  gameId: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgSize: PropTypes.number,
};
