# API

## GetStopsAlongRoute

Retrieves a list of stops along a given train route suitible for rendering to
a user by a client.

```ts
interface RouteRequest {
  // I don't know, whatever.
  trainNumber?: string;

  // The timestamp of departure with the train number.
  departureTime: number;

  // The identifier for the origin of the trip.
  origin: string;

  // Some identifier for the destination.
  destination: string;
}
```

The response should be a list of `Stop` entries.

```ts
interface Stop {
  // An identifier for the given stop which can be used in other API calls.
  id: string;

  // A name suitable for rendering in a user interface.
  name: string;

  // The timestamp of arrival at the stop.
  arrivalTime: number;

  // The timestamp of departure from the stop.
  departureTime: number;
}
```

## GetAlternativeRoutes

Retrieves a list of alternative routes from the specified stop to the given
destination.

```
 interface AlternativeRouteRequest {
    // ISO date time string representing earliest allowed departure time
    departure_time: string;
    
    // Latitude of origin location
    origin_lat: float;

    // Latitude of origin location
    origin_long: float;
    
    // Latitude of destination location
    dest_lat: float;

    // Latitude of destination location
    dest_long: float;
 }
```

The response is specified in [the ResRobot API documentation](https://www.trafiklab.se/api/resrobot-reseplanerare/sok-resa).
