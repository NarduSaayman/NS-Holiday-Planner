import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const setCurrentUser = createAction(
  '[User] setCurrentUser',
  props<{ user: User | null }>()
);
