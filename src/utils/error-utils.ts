import { setAppErrorAC, setAppStatusAC } from "../state/app-reducer";
import { ErrorUtilsDispatchType } from "./error-utils.type";
import {CommonResponseType} from "../api/todolist-api.type";

export const handleServerAppError = <T>(
  data: CommonResponseType<T>,
  dispatch: ErrorUtilsDispatchType
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]));
  } else {
    dispatch(setAppErrorAC("Some error occurred"));
  }
  dispatch(setAppStatusAC("failed"));
};

export const handleServerNetworkError = (
  message: string,
  dispatch: ErrorUtilsDispatchType
) => {
  dispatch(setAppErrorAC(message));
  dispatch(setAppStatusAC("failed"));
};
