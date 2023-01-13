import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { formatImg, formatVideo } from "../../constants/lib/helpers.js";
import { twitch_videos_url } from "../../constants/config/keys.js";
import fetch_Data from "../../constants/services/fetch_Data.js";
import { Typography } from "@mui/material";
import Miniplayer from "./Miniplayer.jsx";

function Game({ gameId, imgUrl, imgSize, name }) {
  const [state, setState] = useState(null);
  imgUrl = formatImg(imgUrl);

  const handleOver = (e) => {
    setState(<Video id={gameId} title={name} />);
  };

  const handleOut = () => {
    setState(null);
  };

  return (
    <div
      className="game__card"
      id={gameId}
      onMouseOver={handleOver}
      onMouseOut={handleOut}
    >
      {state ? (
        state
      ) : (
        <>
          <div className="card__name">
            <h2>{name}</h2>
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

function Video({ id, title }) {
  const [videoUrl, setVideoUrl] = useState(null);
  function fillData() {
    async function getVideoUrl() {
      const response = await fetch_Data(
        `${twitch_videos_url}game_id=${id}&first=1&language=en`
      );
      setVideoUrl(formatVideo(response.data[0].id));
    }
    getVideoUrl();
  }
  useEffect(fillData, [id, videoUrl]);

  return videoUrl ? (
    <>
    <iframe src={videoUrl} title={title} height={300} width={400}></iframe>
    <Miniplayer/>
    </>
  ) : (
    <Typography variant="h5">No video yet</Typography>
  );
}

Video.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Game;
