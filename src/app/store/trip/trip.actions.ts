import { createAction, props } from '@ngrx/store';
import { Trip } from 'src/app/models/trip';

export const addTrip = createAction(
  '[Trip] addTrip',
  props<{ newTrip: Trip }>()
);

export const updateTrip = createAction(
  '[Trip] updateTrip',
  props<{ updatedTrip: Trip }>()
);
export const updateTripByID = createAction(
  '[Trip] updateTripByID',
  props<{ updatedTrip: Trip; tripDocID: string }>()
);

export const deleteTrip = createAction(
  '[Trip] deleteTrip',
  props<{ tripToDelete: Trip }>()
);

export const deleteTripByID = createAction(
  '[Trip] deleteTripByID',
  props<{ tripToDelete: Trip; tripDocID: string }>()
);

export const getTrips = createAction('[Trip] getTrips');

export const getTripsComplete = createAction(
  '[Trip] getTripsComplete',
  props<{ userTrips: Trip[] }>()
);

export const setSelectedTrip = createAction(
  '[Trip] setSelectedTrip',
  props<{ selectedTrip: Trip }>()
);
