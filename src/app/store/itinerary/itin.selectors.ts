import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItin from './itin.reducer';

export const selectItinState = createFeatureSelector<fromItin.State>(
  fromItin.itinFeatureKey
);
