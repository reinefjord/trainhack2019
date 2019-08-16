
const start = Date.parse('2017-08-23 11:31:00 GMT+0200');

export const baseTrip = {
  routeId: 'base-trip',
  stops: [
    {
      id: 0,
      name: 'Stockholm C',
      coords: {lat: 59.3293, long: 18.0686},
      departureTime: new Date(start),
    },
    {
      id: 1,
      name: 'Alvesta',
      coords: {lat: 56.8992, long: 14.556},
      departureTime: new Date(start + 134531),
    },
    {
      id: 2,
      name: 'Malmo',
      coords: {lat: 55.605, long: 13.0038},
      departureTime: new Date(start + 164513),
    },
  ]
};

function date(d) {
  const [date, time] = d.toLocaleString('sv').split(' ');
  return { date, time };
}

const routes = new Map()
    .set('56.8992,14.556', [
      {
        Destination: {
          ...date(new Date(start + 434513)),
        },
      },
      {
        Destination: {
          ...date(new Date(start + 674513)),
        },
      },
    ]);

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