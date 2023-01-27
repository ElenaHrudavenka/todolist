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
        case 'APP/SET-STATUS':
            return {...state, status: action.status};
        case 'APP/SET-ERROR':
            return {...state, error: action.error};
        default:
            return state;
    }
};

export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const);
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
