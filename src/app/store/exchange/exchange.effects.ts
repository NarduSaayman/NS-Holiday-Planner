import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import * as ExchangeActions from './exchange.actions';
import { CurrencyService } from 'src/app/services/currency.service';
import { CurrencyData } from 'src/app/models/currency';

@Injectable()
export class ExchangeEffects {
  getExchangeRates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExchangeActions.getExchangeRates),
      concatMap(() =>
        this.currencyService.getCurrency().pipe(
          map((currency) =>
            ExchangeActions.getExchangeRatesComplete({
              exchangeRates: currency?.data,
            })
          ),
          catchError((error) => {
            this.notificationService.error(
              `Sorry, couldn't get exhange rates.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return of(
              ExchangeActions.getExchangeRatesComplete({
                exchangeRates: null,
              })
            );
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private currencyService: CurrencyService,
    private notificationService: NzNotificationService
  ) {}
}
