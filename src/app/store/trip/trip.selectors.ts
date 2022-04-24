import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectSelectedExchangeRate } from '../exchange/exchange.selectors';
import * as fromTrip from './trip.reducer';

export const selectTripState = createFeatureSelector<fromTrip.TripState>(
  fromTrip.tripFeatureKey
);

export const selectTrips = createSelector(selectTripState, (state) =>
  state.userTrips.map((trip) => {
    if (trip.itinerary.length > 0) {
      // If immutable issue, deep copy and sort
      trip.itinerary.sort((a, b) => {
        if (a.startEndTime.startDate < b.startEndTime.startDate) return -1;
        if (a.startEndTime.startDate > b.startEndTime.startDate) return 1;
        if ((a.startEndTime.endDate || 0) < (b.startEndTime.endDate || 0))
          return -1;
        if ((a.startEndTime.endDate || 0) > (b.startEndTime.endDate || 0))
          return 1;
        return 0;
      });
      const lastItinItem = trip.itinerary[trip.itinerary.length - 1];
      trip.startEndDate = {
        startDate: trip.itinerary[0].startEndTime.startDate,
        endDate:
          lastItinItem.startEndTime.endDate ||
          lastItinItem.startEndTime.startDate,
      };
      trip.itinerary.map(
        ({ costEstimate }) => (trip.totalCost += costEstimate)
      );
    }
    return trip;
  })
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
