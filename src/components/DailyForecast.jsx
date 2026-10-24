
import { getWeatherIcon } from "../utils/weatherIcons";

function DailyForecast({ daily }) {
  return (
    <section className="daily">
      <h3>Daily forecast</h3>
      <div className="daily-grid">
        {daily.time.map((day, i) => (
          <div className="day-card" key={day}>
            <p>
              {new Date(day + "T00:00").toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img src={getWeatherIcon(daily.weather_code[i])} alt="" />
            <div className="day-temps">
              <span>{Math.round(daily.temperature_2m_max[i])}°</span>
              <span>{Math.round(daily.temperature_2m_min[i])}°</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DailyForecast;