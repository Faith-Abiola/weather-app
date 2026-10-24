import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import StatCard from "./components/StatCard";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import loadingIcon from "./assets/images/icon-loading.svg";
import errorIcon from "./assets/images/icon-error.svg";
import retryIcon from "./assets/images/icon-retry.svg";

function App() {
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("loading");
  const [noResults, setNoResults] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [units, setUnits] = useState({
    temp: "celsius",
    wind: "kmh",
    precip: "mm",
  });
  const [location, setLocation] = useState({
    name: "Berlin",
    country: "Germany",
    lat: 52.52,
    lon: 13.41,
  });

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${units.temp}&wind_speed_unit=${units.wind}&precipitation_unit=${units.precip}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [location, units, retryCount]);

  async function handleSearch(query) {
    setNoResults(false);
    try {
      const place = query.split(",")[0].trim();
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1`
      );
      const data = await res.json();

      if (!data.results) {
        setNoResults(true);
        return;
      }

      const r = data.results[0];
      setLocation({
        name: r.name,
        country: r.country,
        lat: r.latitude,
        lon: r.longitude,
      });
    } catch {
      setStatus("error");
    }
  }

  const windLabel = units.wind === "kmh" ? "km/h" : "mph";
  const precipLabel = units.precip === "mm" ? "mm" : "in";

  let content;

  if (noResults) {
    content = <p className="state-msg">No search result found!</p>;
  } else if (status === "error") {
    content = (
      <div className="state-box">
        <img src={errorIcon} alt="" />
        <h2>Something went wrong</h2>
        <p>
          We couldn't connect to the server (API error). Please try again in a
          few moments.
        </p>
        <button
          className="retry-btn"
          onClick={() => {
            setStatus("loading");
            setRetryCount((c) => c + 1)
          }}
            
        >
          <img src={retryIcon} alt="" />
          Retry
        </button>
      </div>
    );
  } else if (!weather) {
    content = (
      <div className="state-box">
        <img className="spin" src={loadingIcon} alt="" />
        <p>Loading...</p>
      </div>
    );
  } else {
    content = (
      <main className="layout">
        <div className="left">
          <CurrentWeather location={location} current={weather.current} />

          <div className="stats">
            <StatCard
              label="Feels Like"
              value={`${Math.round(weather.current.apparent_temperature)}°`}
            />
            <StatCard
              label="Humidity"
              value={`${weather.current.relative_humidity_2m}%`}
            />
            <StatCard
              label="Wind"
              value={`${Math.round(weather.current.wind_speed_10m)} ${windLabel}`}
            />
            <StatCard
              label="Precipitation"
              value={`${weather.current.precipitation} ${precipLabel}`}
            />
          </div>

          <DailyForecast daily={weather.daily} />
        </div>

        <HourlyForecast hourly={weather.hourly} daily={weather.daily} />
      </main>
    );
  }

  return (
    <div className="app">
      <Header units={units} setUnits={setUnits} />
      <h1 className="title">How's the sky looking today?</h1>
      <SearchBar onSearch={handleSearch} />
      {content}
    </div>
  );
}

export default App;