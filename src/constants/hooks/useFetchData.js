import fetchCredentials from "../services/fetch_credentials.js";
import fetch_api from "../services/fetch_api.js";

//TODO: Change to services, remove this hook
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
  const data = await fetch_api(url, { ...options, ...dataOptions });

  return data;
}

const useFetchData = (url, dataOptions = null) => fetchData(url, dataOptions);

export default useFetchData;
