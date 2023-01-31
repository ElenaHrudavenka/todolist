import { initialState, setIsLoggedInAC } from './auth-reducer';

export type AuthActionsTypes = ReturnType<typeof setIsLoggedInAC>;
export type AuthStateType = typeof initialState;
