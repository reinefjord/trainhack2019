import { FakeClient } from "./fake_client.js";

// Export a fake so that we can develop locally without a real backend.
export let client = new FakeClient();

export function installClient(host) {
  client = new Client(host);
}

export function transformAlternatives({ Trip }) {
  return !Trip
    ? []
    : Trip.map(trip => {
        const legs = trip.LegList.Leg;
        const { date, time } = legs[legs.length - 1].Destination;
        const { name } = legs[legs.length - 1].Origin;
        console.log(legs[legs.length - 1]);
        const arrivalTime = Date.parse(`${date} ${time} GMT+0200`);
        return { arrivalTime, type: trip.type, name };
      });
}

class Client {
  constructor(host) {
    this.host = host;
  }

  getStopsAlongRoute(trainNumber) {
    const query = new URLSearchParams({
      trainNumber: trainNumber
    });
    return fetch(`${this.host}/GetStopsAlongRoute?${query}`)
      .then(res => res.json())
      .then(stops => {
        return { stops };
      });
  }

  getAlternativeRoutes(origin, dest, time) {
    const query = new URLSearchParams({
      departure_time: new Date(time).toISOString(),
      origin_lat: origin.lat,
      origin_long: origin.long,
      dest_lat: dest.lat,
      dest_long: dest.long
    });
    return fetch(`${this.host}/GetAlternativeRoutes?${query}`)
      .then(res => (res.ok ? res : raise(new Error(res.statusText))))
      .then(res => res.json())
      .then(transformAlternatives);
  }
}

function raise(e) {
  throw e;
}
