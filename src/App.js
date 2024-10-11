import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, setGeoApiKey, setWeatherApiKey } from "./api";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [geoApiKey, setGeoApi] = useState("");
  const [weatherApiKey, setWeatherApi] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(console.log);
  };

  const handleSetKeys = () => {
    setGeoApiKey(geoApiKey);
    setWeatherApiKey(weatherApiKey);
    setIsModalOpen(false); // Close modal after setting keys
    alert("API keys set successfully!");
  };

  return (
    <div className="container">
      <div className="head">
        <h1>Welcome to my Weather App</h1>
        <p>You can search for the city to get the weather info</p>
        <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>
          Set API Keys
        </button>
      </div>

      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}

      {/* Modal for API Key Input */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>Enter API Keys</h2>
            <input
              type="text"
              placeholder="Enter RapidAPI Key"
              value={geoApiKey}
              onChange={(e) => setGeoApi(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter OpenWeather API Key"
              value={weatherApiKey}
              onChange={(e) => setWeatherApi(e.target.value)}
            />
            <button onClick={handleSetKeys}>Set API Keys</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
