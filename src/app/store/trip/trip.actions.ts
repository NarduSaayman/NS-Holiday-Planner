import { createAction, props } from '@ngrx/store';
import { Trip } from 'src/app/models/trip';

export const addTrip = createAction('[Trip] getTrips');

export const addTripComplete = createAction(
  '[Trip] getTripsComplete',
  props<{
    newTrip: Trip | { name: ''; itinerary: []; userID: ''; tripID: '' };
  }>()
);
export const getTrips = createAction('[Trip] getTrips');

export const getTripsComplete = createAction(
  '[Trip] getTripsComplete',
  props<{ userTrips: Trip[] }>()
);

export const getTrip = createAction('[Trip] getTrip');

export const getTripComplete = createAction(
  '[Trip] getTripsComplete',
  props<{ userTrip: Trip }>()
);
