import { todolistAPI } from './../api/todolist-api';
import { Dispatch } from 'redux';
import {
  FilterValuesType,
  TodolistActionsType,
  TodolistDomainType,
} from './todolists-reducer.type';
import { setAppStatusAC } from './app-reducer';
import { AppActionsType, RequestStatusType } from './app-reducer.type';
import { handleServerNetworkError } from '../utils/error-utils';
import { TodolistType } from '../api/todolist-api.type';

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: TodolistActionsType
): Array<TodolistDomainType> /*|  { filter: string; id: string; title: string }*/ => {
  switch (action.type) {
    case 'SET-TODOLIST':
      return action.todos.map((el) => ({
        ...el,
        filter: 'all',
        entityStatus: 'succeeded',
      }));
    case 'REMOVE-TODOLIST':
      return state.filter((el) => el.id !== action.id);
    case 'ADD-TODOLIST':
      //let newTodolistWithFilter = action.newTodolist, filter:"all"
      return [
        {
          ...action.newTodolist,
          filter: action.filter,
          entityStatus: action.entityStatus,
        },
        ...state,
      ];
    case 'CHANGE-TODOLIST-TITLE':
      return state.map((el) =>
        el.id === action.id ? { ...el, title: action.newTitle } : el
      );
    case 'CHANGE-TODOLIST-FILTER':
      return state.map((el) =>
        el.id === action.id ? { ...el, filter: action.newTodolistFilter } : el
      );
    case 'CHANGE-TODOLIST-ENTITY-STATUS':
      return state.map((el) =>
        el.id === action.id ? { ...el, entityStatus: action.status } : el
      );
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string) =>
  ({ type: 'REMOVE-TODOLIST', id: todolistId } as const);

export const addTodolistAC = (newTodolist: TodolistType) =>
  ({
    type: 'ADD-TODOLIST',
    newTodolist,
    filter: 'all',
    entityStatus: 'succeeded',
  } as const);

export const changeTodolistTitleAC = (todolistId: string, newTitle: string) =>
  ({
    type: 'CHANGE-TODOLIST-TITLE',
    newTitle,
    id: todolistId,
  } as const);
export const changeTodolistFilterAC = (
  todolistId: string,
  newTodolistFilter: FilterValuesType
) =>
  ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId,
    newTodolistFilter,
  } as const);
export const setTodolistsAC = (todos: Array<TodolistType>) =>
  ({
    type: 'SET-TODOLIST',
    todos,
  } as const);

export const changeTodolistEntityStatusAC = (
  id: string,
  status: RequestStatusType
) => ({ type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status } as const);

export const fetchTodosTC =
  () => (dispatch: Dispatch<TodolistActionsType | AppActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI
      .getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data));
      })
      .catch((error) => {
        handleServerNetworkError(error.message, dispatch);
      });
  };

export const removeTodolistTC =
  (todolistId: string) =>
  (dispatch: Dispatch<TodolistActionsType | AppActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
    todolistAPI
      .removeTodolist(todolistId)
      .then((res) => {
        dispatch(removeTodolistAC(todolistId));
        dispatch(setAppStatusAC('succeeded'));
      })
      .catch((error) => {
        handleServerNetworkError(error.message, dispatch);
      });
  };

export const createTodolistTC =
  (title: string) =>
  (dispatch: Dispatch<TodolistActionsType | AppActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI
      .createTodolist(title)
      .then((res) => {
        dispatch(addTodolistAC(res.data.data.item));
        dispatch(setAppStatusAC('succeeded'));
      })
      .catch((error) => {
        handleServerNetworkError(error.message, dispatch);
      });
  };

export const changeTodolistTitleTC =
  (todolistId: string, newTitle: string) =>
  (dispatch: Dispatch<TodolistActionsType | AppActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI
      .updateTodolist(todolistId, newTitle)
      .then((res) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
        dispatch(setAppStatusAC('succeeded'));
      })
      .catch((error) => {
        handleServerNetworkError(error.message, dispatch);
      });
  };
