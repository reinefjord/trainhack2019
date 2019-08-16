export interface Stop {
  id: string;
  name: string;
  arrivalTime: number;
  departureTime: number;
}

export interface RouteRequest {
  trainNumber?: string;
  departureTime: number;
  origin: string;
  destination: string;
}
