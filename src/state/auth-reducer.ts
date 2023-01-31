import { AuthActionsTypes, AuthStateType } from './auth-reducer.type';
import { Dispatch } from 'redux';
import { authAPI } from '../api/todolist-api';
import { setAppStatusAC } from './app-reducer';
import { AppActionsType } from './app-reducer.type';
import {
  handleServerAppError,
  handleServerNetworkError,
} from '../utils/error-utils';
import { LoginRequestType } from '../api/todolist-api.type';

export const initialState = {
  isLoggedIn: false,
};

export const authReducer = (
  state: AuthStateType = initialState,
  action: AuthActionsTypes | AppActionsType
): AuthStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value };
    case 'APP/SET-AUTH-ME':
      return { ...state, isLoggedIn: action.authMe };
    default:
      return state;
  }
};

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', value } as const);

export const setIsLoggedInTC =
  (data: LoginRequestType) =>
  (dispatch: Dispatch<AuthActionsTypes | AppActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(!!res.data.messages));
          dispatch(setAppStatusAC('succeeded'));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error.message, dispatch);
      });
  };

export const logoutTC =
  () => (dispatch: Dispatch<AuthActionsTypes | AppActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    authAPI
      .logout()
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(false));
          dispatch(setAppStatusAC('succeeded'));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
