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
export const deleteTrip = createAction(
  '[Trip] deleteTrip',
  props<{ tripToDelete: Trip }>()
);

export const deleteItinerary = createAction(
  '[Trip] deleteItinerary',
  props<{ filteredTrip: Trip }>()
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
