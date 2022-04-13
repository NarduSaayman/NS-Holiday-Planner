export interface Trip {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  cost: number;
  Itineraries: Itinerary[];
}

export interface Itinerary {
  name: string;
  description: string;
  tag: Tag; // Destination or Travel
  startTime: Date;
  endTime: Date;
  costEstimate: number;
  startLocation: Location;
  endLocation: Location;
}

enum Tag {
  TRAVEL = 'travel',
  DESTINATION = 'destination',
}
interface Location {
  lat: number;
  lon: number;
}
