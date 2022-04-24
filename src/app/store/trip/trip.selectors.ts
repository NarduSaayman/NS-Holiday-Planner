import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItineraryItem } from 'src/app/models/trip';
import { selectSelectedExchangeRate } from '../exchange/exchange.selectors';
import * as fromTrip from './trip.reducer';

export const selectTripState = createFeatureSelector<fromTrip.TripState>(
  fromTrip.tripFeatureKey
);

export const selectTrips = createSelector(selectTripState, (state) =>
  state.userTrips.map((trip) => {
    if (trip.itinerary.length > 0) {
      // deep copy and sort
      let sorterdItinerary: ItineraryItem[] = JSON.parse(
        JSON.stringify(trip.itinerary)
      );
      sorterdItinerary.sort((a, b) => {
        if (a.startEndTime.startDate < b.startEndTime.startDate) return -1;
        if (a.startEndTime.startDate > b.startEndTime.startDate) return 1;
        if ((a.startEndTime.endDate || 0) < (b.startEndTime.endDate || 0))
          return -1;
        if ((a.startEndTime.endDate || 0) > (b.startEndTime.endDate || 0))
          return 1;
        return 0;
      });
      trip = { ...trip, itinerary: sorterdItinerary };
      const lastItinItem = sorterdItinerary[sorterdItinerary.length - 1];
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
