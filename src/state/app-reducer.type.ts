import { setAppErrorAC, setAppStatusAC, setAuthMeAC } from './app-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};

export type AppActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAuthMeAC>;
