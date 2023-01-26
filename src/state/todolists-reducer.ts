import { todolistAPI, TodolistType } from "./../api/todolist-api";
import { Dispatch } from "redux";
import {
  FilterValuesType,
  TodolistActionsType,
  TodolistDomainType,
} from "./todolists-reducer.type";

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: TodolistActionsType
): Array<TodolistDomainType> /*|  { filter: string; id: string; title: string }*/ => {
  switch (action.type) {
    case "SET-TODOLIST":
      return action.todos.map((el) => ({ ...el, filter: "all" }));
    case "REMOVE-TODOLIST":
      return state.filter((el) => el.id !== action.id);
    case "ADD-TODOLIST":
      //let newTodolistWithFilter = action.newTodolist, filter:"all"
      return [{ ...action.newTodolist, filter: action.filter }, ...state];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((el) =>
        el.id === action.id ? { ...el, title: action.newTitle } : el
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((el) =>
        el.id === action.id ? { ...el, filter: action.newTodolistFilter } : el
      );
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string) =>
  ({ type: "REMOVE-TODOLIST", id: todolistId } as const);

export const addTodolistAC = (newTodolist: TodolistType) =>
  ({ type: "ADD-TODOLIST", newTodolist, filter: "all" } as const);

export const changeTodolistTitleAC = (todolistId: string, newTitle: string) =>
  ({
    type: "CHANGE-TODOLIST-TITLE",
    newTitle,
    id: todolistId,
  } as const);
export const changeTodolistFilterAC = (
  todolistId: string,
  newTodolistFilter: FilterValuesType
) =>
  ({
    type: "CHANGE-TODOLIST-FILTER",
    id: todolistId,
    newTodolistFilter,
  } as const);
export const setTodolistsAC = (todos: Array<TodolistType>) =>
  ({
    type: "SET-TODOLIST",
    todos,
  } as const);

export const fetchTodosTC = () => (dispatch: Dispatch<TodolistActionsType>) => {
  todolistAPI.getTodolists().then((res) => {
    let todos = res.data;
    dispatch(setTodolistsAC(todos));
  });
};

export const removeTodolistTC =
  (todolistId: string) => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistAPI.removeTodolist(todolistId).then((res) => {
      dispatch(removeTodolistAC(todolistId));
    });
  };

export const createTodolistTC = (title: string) => (dispatch: Dispatch<TodolistActionsType>) => {
  todolistAPI.createTodolist(title).then((res) => {
    let newTodolist = res.data.data.item;
    dispatch(addTodolistAC(newTodolist));
  });
};

export const changeTodolistTitleTC =
  (todolistId: string, newTitle: string) => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistAPI.updateTodolist(todolistId, newTitle).then((res) => {
      dispatch(changeTodolistTitleAC(todolistId, newTitle));
    });
  };
