import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectSelectedExchangeRate } from '../exchange/exchange.selectors';
import * as fromTrip from './trip.reducer';

export const selectTripState = createFeatureSelector<fromTrip.TripState>(
  fromTrip.tripFeatureKey
);

export const selectTrips = createSelector(
  selectTripState,
  (state) => state.userTrips
);

export const selectSelectedTrip = createSelector(
  selectTripState,
  (state) => state.selectedTrip
);

export const selectSelectedTripCost = createSelector(
  selectTripState,
  selectSelectedExchangeRate,
  (state, exchangeRate) =>
    state.selectedTrip.itinerary?.reduce(
      (total, currentItinItem) => currentItinItem.costEstimate + total,
      0
    ) * exchangeRate.rate
);

export const selectTripStartDate = createSelector(
  selectTripState,
  (state) => state.selectedTrip
);
