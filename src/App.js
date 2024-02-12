import { useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "./api/fetchData";
const DEBOUNCE_TIME_MS = 500; // Adjust this to your desired delay

function App() {
  const [query, setQuery] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  const [error, setError] = useState("");
  // Use a custom debounce function with useEffect for cleanup
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query !== "") search();
    }, DEBOUNCE_TIME_MS);

    return () => clearTimeout(timeoutId); // Clear timeout on unmount
  }, [query]);

  //searching for the city in weather api
  async function search(e) {
    {
      try {
        setCurrentWeather("");
        const data = await fetchData(query);
        setCurrentWeather(data);
        setQuery("");
      } catch (e) {
        setError(e.response.data.message);
      }
    }
  }
  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {currentWeather.current ? (
        <div className="city">
          <h2 className="city-name">
            <span>{currentWeather.location.name}</span>
            <sup>{currentWeather.location.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(currentWeather.current.temp_c)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={currentWeather.current.condition.icon}
              alt={currentWeather.current.condition.text}
            />
            <p>
              <b>{currentWeather.current.condition.text}</b>
            </p>
          </div>
        </div>
      ) : (
        error !== "" && (
          <p className="error">
            <b>Please enter correct city name</b>
          </p>
        )
      )}
    </div>
  );
}

export default App;
