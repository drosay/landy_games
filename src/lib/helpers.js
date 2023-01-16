import { video_url_format } from "../config/keys";

function formatImg(str, width = 400, height = 300) {
  return (str = str
    .replace("{width}", width.toString())
    .replace("{height}", height.toString()));
}

function formatVideo(id) {
  return id ? video_url_format.replace("VIDEO-ID", id.toString()) : null;
}

export { formatImg, formatVideo };
