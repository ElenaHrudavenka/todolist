import { AuthActionsTypes } from "./auth-reducer.type";
import { Dispatch } from "redux";
import { authAPI } from "../api/todolist-api";
import { setAppStatusAC } from "./app-reducer";
import { AppActionsType } from "./app-reducer.type";

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
  (data: any) => (dispatch: Dispatch<AuthActionsTypes | AppActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    authAPI.login().then((res) => {
      dispatch(setIsLoggedInAC(true));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
