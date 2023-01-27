import {
  AppActionsType,
  AppStateType,
  RequestStatusType,
} from "./app-reducer.type";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null,
};

export const appReducer = (
  state: AppStateType = initialState,
  action: AppActionsType
): AppStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: "APP/SET-STATUS", status } as const);
