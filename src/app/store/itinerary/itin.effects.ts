import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ItinActions from './itin.actions';



@Injectable()
export class ItinEffects {

  itinItins$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(ItinActions.itinItins),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => ItinActions.itinItinsSuccess({ data })),
          catchError(error => of(ItinActions.itinItinsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
