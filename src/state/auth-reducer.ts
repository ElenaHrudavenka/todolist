import { AuthActionsTypes } from "./auth-reducer.type";
import { Dispatch } from "redux";
import { authAPI } from "../api/todolist-api";
import { setAppStatusAC } from "./app-reducer";
import { AppActionsType } from "./app-reducer.type";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {LoginRequestType} from "../api/todolist-api.type";

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;
export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

export const setIsLoggedInTC =
  (data: LoginRequestType) => (dispatch: Dispatch<AuthActionsTypes | AppActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    authAPI.login(data)
      .then((res) => {
          if (res.data.resultCode === 0) {
              dispatch(setIsLoggedInAC(true));
              dispatch(setAppStatusAC("succeeded"));
          } else {
              console.dir(res)
              handleServerAppError(res.data, dispatch)
          }
      })
      .catch((error) => {
        handleServerNetworkError(error.message, dispatch);
      });
  };
