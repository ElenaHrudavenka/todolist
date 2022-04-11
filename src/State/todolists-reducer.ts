import {v1} from "uuid";
import { TodolistType } from './../api/todolist-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolistId: string
    newTodolistTitle: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    changeTodolistTitle: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    newTodolistFilter: FilterValuesType
}
export type SetTodosActionType = ReturnType<typeof setTodolistsAC>
//юнион тип
type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
| SetTodosActionType

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> /*|  { filter: string; id: string; title: string }*/ => {
    switch (action.type) {
        case "SET-TODOS":
            return  action.todos.map(el =>({...el, filter: "all"}))
        case 'REMOVE-TODOLIST':
            return state.filter((el) => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.newTodolistTitle, filter: "all", addedDate:'', order:0}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((el) => el.id === action.id ? {...el, title: action.changeTodolistTitle} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((el) => el.id === action.id ? {...el, filter: action.newTodolistFilter} : el)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolistId: v1(), newTodolistTitle}
}

export const changeTodolistAC = (todolistId2: string, changeTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        changeTodolistTitle,
        id: todolistId2
    }
}
export const changeTodolistFilterAC = (todolistId: string, newTodolistFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        newTodolistFilter
    }
}
export const setTodolistsAC = (todos: Array<TodolistType>) => {
        return {
            type: 'SET-TODOS',
            todos,
        } as const
}

