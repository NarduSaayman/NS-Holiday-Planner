import { state } from '@angular/animations';
import { user } from '@angular/fire/auth';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  currentUser: User | null;
}

export const initialState: UserState = {
  currentUser: null,
};

export const reducer = createReducer(
  initialState,

  on(UserActions.setCurrentUser, (state, { user }) => ({
    ...state,
    currentUser: user,
  }))
);
