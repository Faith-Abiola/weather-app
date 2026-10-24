
import { getWeatherIcon } from "../utils/weatherIcons";

function CurrentWeather({ location, current }) {
  const date = new Date(current.time).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="current">
      <div>
        <h2>
          {location.name}, {location.country}
        </h2>
        <p>{date}</p>
      </div>
      <div className="current-temp">
        <img src={getWeatherIcon(current.weather_code)} alt="" />
        <span>{Math.round(current.temperature_2m)}°</span>
      </div>
    </section>
  );
}

export default CurrentWeather;