//Configure when build
const api_configuration = {
  //in dev http://localhost:3500/ railway api https://landygames.up.railway.app/
  api_credentials_url: "http://localhost:3500",
  twitch_games_url: "https://api.twitch.tv/helix/games/top?",
  twitch_videos_url: "https://api.twitch.tv/helix/videos?",
  twitch_query_url: "https://api.twitch.tv/helix/search/categories?query=",
  video_url_format:
    "https://player.twitch.tv/?video=vVIDEO-ID&parent=localhost&parent=landy-games.up.railway.app&preload=metadata",
};

module.exports = api_configuration;