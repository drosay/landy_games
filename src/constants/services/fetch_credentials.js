import { api_credentials_url } from "../config/keys.js";
import fetch_api from "./fetch_api.js";

const fetchCredentials = async () => await fetch_api(api_credentials_url);

export default fetchCredentials;
