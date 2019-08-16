
export const baseTrip = {
  routeId: 'base-trip',
  stops: [
    {
      id: 0,
      name: 'Stockholm C',
      departureTime: Date.now(),
    },
    {
      id: 1,
      name: 'Alvesta',
      departureTime: Date.now() + 134531,
    },
    {
      id: 2,
      name: 'Malmo',
      departureTime: Date.now() + 164513,
    },
  ]
};

const routes = new Map()
    .set(1, [
       
    ]);

/**
 * A FakeClient implements the RoutesBackendClient interface with fake data.
 */
export class FakeClient {
  getStopsAlongRoute(request) {
    return Promise.resolve(baseTrip);
  }

  getAlternativeRoutes(request) {
    return Promise.resolve(routes.get(request.id) || []);
  }
}