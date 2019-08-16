
export const baseTrip = {
  routeId: 'base-trip',
  stops: [
    {
      id: 0,
      name: 'Stockholm C',
      coords: {lat: 59.3293, long: 18.0686},
      departureTime: new Date(Date.now()),
    },
    {
      id: 1,
      name: 'Alvesta',
      coords: {lat: 56.8992, long: 14.556},
      departureTime: new Date(Date.now() + 134531),
    },
    {
      id: 2,
      name: 'Malmo',
      coords: {lat: 55.605, long: 13.0038},
      departureTime: new Date(Date.now() + 164513),
    },
  ]
};

const routes = new Map()
    .set('56.8992,14.556', [null, null]);

/**
 * A FakeClient implements the RoutesBackendClient interface with fake data.
 */
export class FakeClient {
  getStopsAlongRoute(request) {
    return Promise.resolve(baseTrip);
  }

  getAlternativeRoutes(origin) {
    return Promise.resolve(routes.get(`${origin.lat},${origin.long}`) || []);
  }
}