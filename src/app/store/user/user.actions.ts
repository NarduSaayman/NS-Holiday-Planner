import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const getUser = createAction('[User] getUser');

export const getUserComplete = createAction(
  '[User] getUserComplete',
  props<{ user: User }>()
);
