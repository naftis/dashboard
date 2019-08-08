import React, { useEffect, useState } from "react";
import "./App.css";
import * as weather from "./services/weather";
import { weatherIcons } from "./services/forecast";

const App: React.FC = () => {
  const [time, setTime] = useState("");
  const [icon, setIcon] = useState("");
  const [temperature, setTemperature] = useState("");

  function getTime() {
    const currentTime = `${/^\d\d?:\d\d/.exec(new Date().toTimeString())}`;
    setTime(currentTime);
  }

  useEffect(() => {
    getTime();
    const interval = setInterval(getTime, 1000);
    return () => clearInterval(interval);
  }, []);

  function getWeather() {
    weather.weather.getByCityName("Tampere").then(x => {
      const temp = x.main.temp.toFixed(1);
      setTemperature(temp);
      setIcon((weatherIcons as any)[x.weather[0].icon]);
    });
  }

  useEffect(() => {
    getWeather();
    const interval = setInterval(getWeather, 1000 * 60 * 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div id="time">{time}</div>
      <div id="weather">
        <div>{temperature}°C</div>
        <div id="icon">{icon}</div>
      </div>
    </div>
  );
};

export default App;
