import { FakeClient } from './fake_client.js';

// Export a fake so that we can develop locally without a real backend.
export let client = new FakeClient();

export function installClient(host) {
  client = new Client(host);
}

class Client {
  constructor(host) {
    this.host = host;
  }

  getStopsAlongRoute(request) {
    return fetch(`${this.host}/GetStopsAlongRoute`)
      .then(res => res.json())
      .then(obj => {
        const stops = obj.data;
        return { stops };
      });
  }

  getAlternativeRoutes(origin, dest, time) {
    const query = new URLSearchParams({
      'departure_time': time.toISOString(),
      'origin_lat': origin.lat,
      'origin_long': origin.long,
      'dest_lat': dest.lat,
      'dest_long': dest.long,
    });
    return fetch(`${this.host}/GetAlternativeRoutes?${query}`)
      .then(res => res.json())
      .then(({Trip}) => Trip);
  }
}