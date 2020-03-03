import {Ingredient} from '../../shared/ingredient.model';
import * as authActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}
const initialState: State = {
  token: null,
  authenticated: false
};
export function authReducer(state = initialState, action: authActions.AuthActions) {
  switch (action.type) {
    case (authActions.SIGNUP):
    case (authActions.SIGNIN):
      return {
        ...state,
        authenticated: true
      };
    case (authActions.LOGOUT):
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload
      }
    default:
      return state;
  }
}
