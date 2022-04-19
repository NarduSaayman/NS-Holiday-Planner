import { Action, createReducer, on } from '@ngrx/store';
import { Trip } from 'src/app/models/trip';
import * as TripActions from './trip.actions';

export const tripFeatureKey = 'trip';

export interface TripState {
  isLoading: boolean;
  userTrips: Trip[];
  newTrip: Trip;
  selectedTrip: Trip;
}

export const initialState: TripState = {
  isLoading: false,
  userTrips: [],
  newTrip: { name: '', itinerary: [], userID: '', tripID: '' },
  selectedTrip: { name: '', itinerary: [], userID: '', tripID: '' },
};

export const reducer = createReducer(
  initialState,

  on(TripActions.getTrips, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(TripActions.getTripsComplete, (state, { userTrips }) => ({
    ...state,
    isLoading: false,
    userTrips,
  }))
);
