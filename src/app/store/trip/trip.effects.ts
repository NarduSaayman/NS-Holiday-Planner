import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as TripActions from './trip.actions';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/services/user.service';
import { selectCurrentUser } from '../user/user.selectors';
import { UserState } from '../user/user.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class TripEffects {
  getTrips$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.getTrips),
      withLatestFrom(selectCurrentUser),
      concatMap((currentUser) => {
        if (!currentUser) return EMPTY;
        return this.userService.getUserTrips(currentUser?.uid).pipe(
          map((userTrips) => TripActions.getTripsComplete({ userTrips })),
          catchError((error) => {
            this.notificationService.error(
              `Sorry, couldn't get your trips.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return of(
              TripActions.getTripsComplete({
                userTrips: [],
              })
            );
          })
        );
      })
    );
  });

  addTrip$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.addTrip),
      concatMap(({ newTrip }) =>
        this.userService.addUserTrip(newTrip).pipe(
          map(() => TripActions.getTrips()),
          catchError((error) => {
            this.notificationService.error(
              `Sorry, couldn't add your trip.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return EMPTY;
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private notificationService: NzNotificationService,
    private userStore: Store<UserState>
  ) {}
}
