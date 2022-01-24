import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { weatherIcons } from "../services/forecast";
import { formatTime, parseDaySeconds } from "../services/time";
import { weather } from "../services/weather";
import "./BusStop.css";

const STOPS = {
  "tampere:0819": {
    background: "none",
  },
  "tampere:4511": {
    background: "rgba(6,70,107,0.29)",
  },
};

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

  const { data } = useQuery(BUS_SCHEDULES, {
    variables: {
      stopIds: Object.keys(STOPS),
      numberOfDepartures: 10,
    },
    pollInterval: 60 * 1000,
  });

  const stoptimes = data?.stops
    ?.flatMap((stop: any) => stop.stoptimesWithoutPatterns)
    .sort(
      (a: any, b: any) =>
        new Date(a.realtimeDeparture + a.serviceDay * 1000).getTime() -
        new Date(b.realtimeDeparture + b.serviceDay * 1000).getTime()
    );

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
            <tr
              key={i}
              style={{
                background:
                  STOPS[stoptime.stop.gtfsId as keyof typeof STOPS]?.background,
              }}
            >
              <td>{stoptime.trip.route.shortName}</td>
              <td>{formatTime(parseDaySeconds(stoptime.realtimeDeparture))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
