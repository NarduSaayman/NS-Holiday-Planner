import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface State {}

export const initialState: State = {};

export const reducer = createReducer(
  initialState,

  on(UserActions.getUser, (state) => state),
  on(UserActions.getUserComplete, (state, action) => state)
);
