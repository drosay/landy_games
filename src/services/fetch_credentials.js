import { api_credentials_url } from "../config/keys.js";
import fetch_api from "./fetch_api.js";

export default async function fetchCredentials() {
  return await fetch_api(api_credentials_url);
}