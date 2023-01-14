import { useState } from "react";
import PropTypes from "prop-types";
import { formatImg } from "../../lib/helpers.js";
import { useMiniplayerContext } from "../../context/MiniplayerContext.jsx";
import {Button, ButtonGroup, Typography} from '@mui/material'

export default function Game({ gameId, imgUrl, imgSize, name }) {
  const [state, setState] = useState(null);
  const {setVideoId} = useMiniplayerContext()

  imgUrl = formatImg(imgUrl);

  const handleOut = () => {
    setState(null);
  };

  const handleClick = () =>{
    setVideoId(gameId)
  }

  return (
    <div className="game__card" id={gameId} onMouseOut={handleOut}>
      {state ? (
        state
      ) : (
        <>
          <div className="card__name">
            <Typography variant="h2" className="name">{name}</Typography>
            <ButtonGroup orientation="vertical" color="secondary" variant="contained">
              <Button onClick={handleClick}>Play Last clip</Button>
              <Button onClick={handleClick}>Latest Clips</Button>
            </ButtonGroup>
          </div>
          <img className="card__img" src={imgUrl} title={name} alt={name} />
        </>
      )}
    </div>
  );
}

Game.propTypes = {
  gameId: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgSize: PropTypes.number,
};
