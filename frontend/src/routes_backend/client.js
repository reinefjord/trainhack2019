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
      .then(res => res.json());
  }

  getAlternativeRoutes(request) {
    return Promise.reject(new Error('getAlternativeRoutes unimplemented'));
  }
}