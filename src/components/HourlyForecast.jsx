
import { useState } from "react";
import { getWeatherIcon } from "../utils/weatherIcons";

function HourlyForecast({ hourly, daily }) {
  const [dayIndex, setDayIndex] = useState(0);
  const selectedDate = daily.time[dayIndex];

  const hours = hourly.time
    .map((time, i) => ({
      time,
      temp: hourly.temperature_2m[i],
      code: hourly.weather_code[i],
    }))
    .filter((h) => h.time.startsWith(selectedDate));

  return (
    <section className="hourly">
      <div className="hourly-top">
        <h3>Hourly forecast</h3>
        <select
          value={dayIndex}
          onChange={(e) => setDayIndex(Number(e.target.value))}
        >
          {daily.time.map((day, i) => (
            <option key={day} value={i}>
              {new Date(day + "T00:00").toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </option>
          ))}
        </select>
      </div>

      <div className="hourly-list">
        {hours.map((h) => (
          <div className="hour-row" key={h.time}>
            <img src={getWeatherIcon(h.code)} alt="" />
            <span className="hour-time">
              {new Date(h.time).toLocaleTimeString("en-US", {
                hour: "numeric",
                hour12: true,
              })}
            </span>
            <span>{Math.round(h.temp)}°</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HourlyForecast;