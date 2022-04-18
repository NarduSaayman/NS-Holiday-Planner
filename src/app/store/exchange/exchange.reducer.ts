import { Action, createReducer, on } from '@ngrx/store';
import { CurrencyData, ExchangeRate } from 'src/app/models/currency';
import * as ExchangeActions from './exchange.actions';

export const exchangeFeatureKey = 'exchange';

export interface ExchangeState {
  isLoading: boolean;
  exchangeRates: CurrencyData | null;
  selectedExchangeRate: ExchangeRate;
}

export const initialState: ExchangeState = {
  isLoading: false,
  exchangeRates: null,
  selectedExchangeRate: { ISOName: 'USD', rate: 1 },
};

export const reducer = createReducer(
  initialState,

  on(ExchangeActions.getExchangeRates, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(ExchangeActions.getExchangeRatesComplete, (state, { exchangeRates }) => ({
    ...state,
    isLoading: false,
    exchangeRates,
  })),

  on(ExchangeActions.setSelectedExchangeRate, (state, { exchangeRate }) => ({
    ...state,
    selectedExchangeRate: exchangeRate,
  }))
);
