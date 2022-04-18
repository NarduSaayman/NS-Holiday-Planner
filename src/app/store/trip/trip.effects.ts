import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as TripActions from './trip.actions';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class TripEffects {
  getTrips$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.getTrips),
      concatMap(() =>
        this.userService.getUserTrips().pipe(
          map((userTrips) => TripActions.getTripsComplete({ userTrips })),
          catchError((error) => {
            this.notificationService.error(
              `Sorry, couldn't get exhange rates.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return of(
              TripActions.getTripsComplete({
                userTrips: [],
              })
            );
          })
        )
      )
    );
  });

  getTrip$ = createEffect((tripID: string) => {
    return this.actions$.pipe(
      ofType(TripActions.getTrip),
      concatMap(() =>
        this.userService.getUserTrip(tripID).pipe(
          map((userTrip) => TripActions.getTripComplete({ userTrip })),
          catchError((error) => {
            this.notificationService.error(
              `Sorry, couldn't get exhange rates.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return of(
              TripActions.getTripComplete({
                userTrip: 
              })
            );
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private notificationService: NzNotificationService
  ) {}
}
