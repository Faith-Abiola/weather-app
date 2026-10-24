
import sunny from "../assets/images/icon-sunny.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import overcast from "../assets/images/icon-overcast.webp";
import fog from "../assets/images/icon-fog.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import storm from "../assets/images/icon-storm.webp";

export function getWeatherIcon(code) {
  if (code === 0) return sunny;
  if (code <= 2) return partlyCloudy;
  if (code === 3) return overcast;
  if (code === 45 || code === 48) return fog;
  if (code >= 51 && code <= 57) return drizzle;
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return rain;
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return snow;
  if (code >= 95) return storm;
  return overcast;
}