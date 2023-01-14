import { video_url_format } from "../config/keys";

const formatImg = (str, width = 400, height = 300) =>
  (str = str
    .replace("{width}", width.toString())
    .replace("{height}", height.toString()));

const formatVideo = (id) =>
  id ? video_url_format.replace("VIDEO-ID", id.toString()) : null;

export { formatImg, formatVideo };
