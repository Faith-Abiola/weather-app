import { useState } from "react";
import logo from "../assets/images/logo.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import checkIcon from "../assets/images/icon-checkmark.svg";

const METRIC = { temp: "celsius", wind: "kmh", precip: "mm" };
const IMPERIAL = { temp: "fahrenheit", wind: "mph", precip: "inch" };

const groups = [
  {
    title: "Temperature",
    key: "temp",
    options: [
      ["celsius", "Celsius (°C)"],
      ["fahrenheit", "Fahrenheit (°F)"],
    ],
  },
  {
    title: "Wind Speed",
    key: "wind",
    options: [
      ["kmh", "km/h"],
      ["mph", "mph"],
    ],
  },
  {
    title: "Precipitation",
    key: "precip",
    options: [
      ["mm", "Millimeters (mm)"],
      ["inch", "Inches (in)"],
    ],
  },
];

function Header({ units, setUnits }) {
  const [open, setOpen] = useState(false);
  const isImperial =
    units.temp === "fahrenheit" &&
    units.wind === "mph" &&
    units.precip === "inch";

  return (
    <header className="header">
      <img src={logo} alt="Weather Now" />

      <div className="units-wrap">
        <button className="units-btn" onClick={() => setOpen(!open)}>
          <img src={unitsIcon} alt="" />
          Units
          <img src={dropdownIcon} alt="" />
        </button>

        {open && (
          <div className="units-menu">
            <button
              className="menu-item"
              onClick={() => setUnits(isImperial ? METRIC : IMPERIAL)}
            >
              Switch to {isImperial ? "Metric" : "Imperial"}
            </button>

            {groups.map((g) => (
              <div key={g.key} className="menu-group">
                <p className="menu-title">{g.title}</p>
                {g.options.map(([value, label]) => (
                  <button
                    key={value}
                    className={`menu-item ${units[g.key] === value ? "active" : ""}`}
                    onClick={() => setUnits({ ...units, [g.key]: value })}
                  >
                    {label}
                    {units[g.key] === value && <img src={checkIcon} alt="" />}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;