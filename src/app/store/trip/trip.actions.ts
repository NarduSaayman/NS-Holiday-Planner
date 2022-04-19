import { createAction, props } from '@ngrx/store';
import { Trip } from 'src/app/models/trip';

export const addTrip = createAction(
  '[Trip] addTrip',
  props<{ newTrip: Trip }>()
);

export const getTrips = createAction('[Trip] getTrips');

export const getTripsComplete = createAction(
  '[Trip] getTripsComplete',
  props<{ userTrips: Trip[] }>()
);
