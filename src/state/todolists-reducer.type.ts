import { TodolistType } from "../api/todolist-api";
import { RequestStatusType } from "./app-reducer.type";
import {
  addTodolistAC, changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
} from "./todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type removeTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type addTodolistActionType = ReturnType<typeof addTodolistAC>;
export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>;
//юнион тип
export type TodolistActionsType =
  | removeTodolistActionType
  | addTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | setTodolistsActionType
    |ReturnType<typeof changeTodolistEntityStatusAC>;
