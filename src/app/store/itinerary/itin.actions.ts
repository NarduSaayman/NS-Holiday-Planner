import { createAction, props } from '@ngrx/store';

export const itinItins = createAction(
  '[Itin] Itin Itins'
);

export const itinItinsSuccess = createAction(
  '[Itin] Itin Itins Success',
  props<{ data: any }>()
);

export const itinItinsFailure = createAction(
  '[Itin] Itin Itins Failure',
  props<{ error: any }>()
);
