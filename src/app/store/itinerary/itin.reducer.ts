import { Action, createReducer, on } from '@ngrx/store';
import * as ItinActions from './itin.actions';

export const itinFeatureKey = 'itin';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(ItinActions.itinItins, state => state),
  on(ItinActions.itinItinsSuccess, (state, action) => state),
  on(ItinActions.itinItinsFailure, (state, action) => state),

);
