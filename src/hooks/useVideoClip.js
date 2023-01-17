import { useState, useEffect } from "react";
import { twitch_videos_url } from "../config/keys";
import { formatVideo } from "../lib/helpers";
import fetch_Data from "../services/fetch_Data.js";

export default function useVideoClip(gameId = null) {
  //TODO: All
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetch_Video_Id = async () => {
      const response = await fetch_Data(
        `${twitch_videos_url}game_id=${gameId}&first=1&language=en`
      );

      if (response.fetch_error) {
        console.log(`Error ${response.status}: ${response.message}`);
        return null;
      }
      setVideoData(response?.data[0]);
    };
    if (gameId) fetch_Video_Id();
  }, [gameId]);

  return { videoUrl: formatVideo(videoData?.id), ...videoData };
}
