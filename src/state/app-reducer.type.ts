import { setAppErrorAC, setAppStatusAC } from "./app-reducer";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type AppStateType = {
  status: RequestStatusType;
  error: string | null;
};

export type AppActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>;
