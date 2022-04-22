import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as TripActions from './trip.actions';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/services/firestore.service';
import { selectCurrentUser } from '../user/user.selectors';
import { setCurrentUser } from '../user/user.actions';
import { select, Store } from '@ngrx/store';
import { UserState } from '../user/user.reducer';

@Injectable()
export class TripEffects {
  getTrips$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.getTrips, setCurrentUser),
      withLatestFrom(this.userStore.pipe(select(selectCurrentUser))),
      concatMap(([action, currentUser]) => {
        if (!currentUser) return EMPTY;
        return this.userService.getUserTrips(currentUser?.uid).pipe(
          map((userTrips) => {
            return TripActions.getTripsComplete({ userTrips });
          }),
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
      withLatestFrom(this.userStore.pipe(select(selectCurrentUser))),
      concatMap(([{ newTrip }, currentUser]) => {
        if (!currentUser) return EMPTY;
        return this.userService.addUserTrip(newTrip, currentUser.uid).pipe(
          map(() => TripActions.getTrips()),
          catchError((error) => {
            this.notificationService.error(
              `Sorry, couldn't add your trip.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return EMPTY;
          })
        );
      })
    );
  });

  updateTrip$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.updateTrip),
      concatMap(({ updatedTrip }) =>
        this.userService.updateUserTrip(updatedTrip).pipe(
          map(() => TripActions.getTrips()),
          catchError((error) => {
            this.notificationService.error(
              `Sorry, couldn't update that trip.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return EMPTY;
          })
        )
      )
    );
  });

  deleteTrip$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.deleteTrip),
      concatMap(({ tripToDelete }) =>
        this.userService.updateUserTrip(tripToDelete).pipe(
          map(() => TripActions.getTrips()),
          catchError((error) => {
            this.notificationService.error(
              `Sorry, couldn't delete that trip.`,
              error.toString(),
              { nzDuration: 0 }
            );
            return EMPTY;
          })
        )
      )
    );
  });

  //TODO
  deleteItinerary$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.deleteItinerary),
      concatMap(({ filteredTrip }) =>
        this.userService.updateUserTrip(filteredTrip).pipe(
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
