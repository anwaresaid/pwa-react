import axios from "axios";

const url = "https://api.weatherapi.com/v1/current.json";
const API_KEY = "41c19f5333d14c448dc114211241102";

export const fetchData = async (query) => {
  const { data } = await axios.get(url, {
    params: {
      q: query,
      key: API_KEY,
      aqi: "yes",
    },
  });
  return data;
};
