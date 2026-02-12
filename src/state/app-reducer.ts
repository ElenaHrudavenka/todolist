import { authAPI } from '../api/todolist-api';
import {
  AppActionsType,
  AppStateType,
  RequestStatusType,
} from './app-reducer.type';
import { Dispatch } from 'redux';
import { AuthActionsTypes } from './auth-reducer.type';
import { setIsLoggedInAC } from './auth-reducer';
import { resultCode } from '../api/todolist-api.type';

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null,
  isInitialized: false,
};

export const appReducer = (
  state: AppStateType = initialState,
  action: AppActionsType
): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };
    case 'APP/SET-ERROR':
      return { ...state, error: action.error };
    case 'APP/SET-AUTH-ME':
      return { ...state, isInitialized: action.authMe };
    default:
      return state;
  }
};

export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status } as const);
export const setAppErrorAC = (error: string | null) =>
  ({ type: 'APP/SET-ERROR', error } as const);
export const setAuthMeAC = (authMe: boolean) =>
  ({ type: 'APP/SET-AUTH-ME', authMe } as const);

export const initializeAppTC =
  () => (dispatch: Dispatch<AppActionsType | AuthActionsTypes>) => {
    authAPI.authMe()
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true));
        } else {
          dispatch(setIsLoggedInAC(false));
        }
      })
      .catch(() => {
        dispatch(setIsLoggedInAC(false));
      })
      .finally(() => {
        dispatch(setAuthMeAC(true));
      });
  };
