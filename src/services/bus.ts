export const fetchSchedules = async () => {
  // Copied from: https://tremonitori.digitransit.fi/stop/tampere:4507 from network tab with copy as fetch
  const request = await fetch(
    "https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,fi;q=0.8",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
      referrer: "https://tremonitori.digitransit.fi/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body:
        '{"operationName":"GetStops","variables":{"stopIds":["tampere:4507"],"numberOfDepartures":10},"query":"query GetStops($stopIds: [String], $numberOfDepartures: Int!) {\\n  stops(ids: $stopIds) {\\n    name\\n    gtfsId\\n    stoptimesWithoutPatterns(numberOfDepartures: $numberOfDepartures) {\\n      stop {\\n        id\\n        gtfsId\\n        platformCode\\n        __typename\\n      }\\n      scheduledArrival\\n      realtimeArrival\\n      arrivalDelay\\n      scheduledDeparture\\n      realtimeDeparture\\n      departureDelay\\n      usedTime: realtimeDeparture\\n      timepoint\\n      realtime\\n      realtimeState\\n      pickupType\\n      dropoffType\\n      serviceDay\\n      stopHeadsign\\n      headsign\\n      trip {\\n        gtfsId\\n        stops {\\n          id\\n          __typename\\n        }\\n        route {\\n          shortName\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}',
      method: "POST",
      mode: "cors",
      credentials: "omit",
    }
  );
  const response = await request.json();
  return response;
};
