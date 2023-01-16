export default async function fetch_api(url, options = null) {
  try {
    const response = await fetch(url, options);
    if (response.status !== 200)
      // eslint-disable-next-line no-throw-literal
      throw {
        status: response.status,
        message: response.statusText,
        fetch_error: true,
      };
    return response.json();
  } catch (err) {
    return err;
  }
}
