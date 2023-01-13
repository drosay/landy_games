import fetchCredentials from "./fetch_credentials.js";
import fetch_api from "./fetch_api.js";

async function fetchData(url, dataOptions = null, count = 1) {
  const response = await fetchCredentials();

  if (count === 3) return response;
  if (response.fetch_error && count < 3)
    return fetchData(url, dataOptions, count++);

  const { client_id, access_token } = response;
  const options = {
    headers: {
      "Client-Id": client_id,
      Authorization: `Bearer ${access_token}`,
    },
  };
  const data = await fetch_api(url, { ...dataOptions, ...options });
  return data;
}

export default fetchData;
