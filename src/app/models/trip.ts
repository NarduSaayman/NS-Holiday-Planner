export interface Trip {
  name: string;
  startDate: Date;
  endDate: Date;
  cost: number;
  Itineraries: Itinerary[];
}

export interface Itinerary {
  name: string;
  description: string;
  tag: string;
  startTime: Date;
  endTime: Date;
  costEstimate: number;
  startLocation: Location;
  endLocation: Location;
}

interface Location {
  lat: number;
  lon: number;
}
