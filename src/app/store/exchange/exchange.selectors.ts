import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromExchange from './exchange.reducer';

export const selectExchangeState =
  createFeatureSelector<fromExchange.ExchangeState>(
    fromExchange.exchangeFeatureKey
  );

export const selectExchangeRates = createSelector(
  selectExchangeState,
  (state) => state.exchangeRates
);

export const selectSelectedExchangeRate = createSelector(
  selectExchangeState,
  (state) => state.selectedExchangeRate
);
