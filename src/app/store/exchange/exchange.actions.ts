import { createAction, props } from '@ngrx/store';
import { CurrencyData, ExchangeRate } from 'src/app/models/currency';

export const getExchangeRates = createAction('[Exchange] getExchangeRates');

export const getExchangeRatesComplete = createAction(
  '[Exchange] getExchangeRatesComplete',
  props<{ exchangeRates: CurrencyData | null }>()
);
export const setSelectedExchangeRate = createAction(
  '[Exchange] setSelectedExchangeRate',
  props<{ exchangeRate: ExchangeRate }>()
);
