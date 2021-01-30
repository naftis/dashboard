import { useEffect, useRef, useState } from "react";
import "./App.css";
import { weatherIcons } from "./services/forecast";
import { weather } from "./services/weather";

function App() {
  const [icon, setIcon] = useState("");
  const [temperature, setTemperature] = useState("");
  const iframe = useRef<HTMLIFrameElement>(null);

  function getWeather() {
    weather.getByCityName("Tampere").then((x) => {
      const temp = x.main.temp.toFixed(1);
      setTemperature(temp);
      setIcon((weatherIcons as any)[x.weather[0].icon]);
    });
  }

  async function getSchedules() {
    if (iframe.current) {
      // eslint-disable-next-line no-self-assign
      iframe.current.src = iframe.current.src;
    }
  }

  useEffect(() => {
    getWeather();
    const interval = setInterval(getWeather, 1000 * 60 * 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getSchedules();
    const interval = setInterval(getSchedules, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <iframe
        title="Nysse"
        src="https://tremonitori.digitransit.fi/stop/tampere:4507"
        style={{ border: 0, width: "100%", height: "100%" }}
        ref={iframe}
      ></iframe>
      <div id="weather">
        <div>{temperature}°C</div>
        <div id="icon">{icon}</div>
      </div>
    </div>
  );
}

export default App;
