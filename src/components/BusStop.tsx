import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { weatherIcons } from "../services/forecast";
import { formatTime, parseDaySeconds } from "../services/time";
import { weather } from "../services/weather";
import { useDoubleTap } from "use-double-tap";
import "./BusStop.css";

const BUS_SCHEDULES = gql`
  query GetStops($stopIds: [String], $numberOfDepartures: Int!) {
    stops(ids: $stopIds) {
      name
      gtfsId
      stoptimesWithoutPatterns(numberOfDepartures: $numberOfDepartures) {
        stop {
          id
          gtfsId
          platformCode
          __typename
        }
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        usedTime: realtimeDeparture
        timepoint
        realtime
        realtimeState
        pickupType
        dropoffType
        serviceDay
        headsign
        trip {
          route {
            shortName
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

export const BusStop = () => {
  const [time, setTime] = useState("");
  const [icon, setIcon] = useState("");
  const [temperature, setTemperature] = useState("");
  const [selectedStop, setSelectedStop] = useState(0);

  const bind = useDoubleTap(() => {
    setSelectedStop(selectedStop === 0 ? 1 : 0);
  });

  function getWeather() {
    weather.getByCityName("Tampere").then((x) => {
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

  const handleTime = () => {
    const date = new Date();
    const localTime = date.toLocaleTimeString("en-US", { hour12: false });

    setTime(localTime);
  };

  useEffect(() => {
    const timeout = setInterval(handleTime, 500);
    return () => clearInterval(timeout);
  }, []);

  const { loading, error, data } = useQuery(BUS_SCHEDULES, {
    variables: {
      stopIds: ["tampere:4507", "tampere:4511"],
      numberOfDepartures: 10,
    },
    pollInterval: 60 * 1000,
  });

  const stop = data?.stops[selectedStop];
  const stoptimes = stop.stoptimesWithoutPatterns;

  return (
    <>
      <header className="header">
        <div className="weather">
          <div className="icon">{icon}</div>
          <div
            className={`temperature ${
              Number(temperature) > 0 ? "positive" : "negative"
            }`}
          >
            {temperature}°C
          </div>
        </div>
        <div className="stop" {...bind}>
          {stop.name}
        </div>
        <div className="time">{time}</div>
      </header>
      <table className="bus">
        <thead>
          <tr>
            <th>Linja</th>
            <th>Lähtöaika</th>
          </tr>
        </thead>
        <tbody>
          {stoptimes?.map((stoptime: any, i: number) => (
            <tr key={i}>
              <td>{stoptime.trip.route.shortName}</td>
              <td>{formatTime(parseDaySeconds(stoptime.scheduledArrival))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
