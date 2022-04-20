export enum Tag {
  TRAVEL = 'travel',
  DESTINATION = 'destination',
}

export interface Trip {
  name: string;
  description?: string;
  location?: string;
  itinerary: ItineraryItem[];
  startEndDate: StartEndDate;
  userID: string;
  tripID: string;
  // Selectors for start and end date
  // Selector for cost, derived from interaries
}

export interface StartEndDate {
  startDate: Date;
  endDate?: Date;
}

export interface ItineraryItem {
  name: string;
  description?: string;
  tag: Tag; // Destination or Travel
  startEndTime: StartEndDate;
  costEstimate: number;
  startLocation?: GeoLocation;
  endLocation?: GeoLocation;
  notes?: string;
}
interface GeoLocation {
  lat: number;
  lon: number;
}
