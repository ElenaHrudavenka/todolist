import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

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
//юнион тип
type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

const initialState: Array<TodolistsType> = []

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionsType): Array<TodolistsType> /*|  { filter: string; id: string; title: string }*/ => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((el) => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: action.todolistId, title: action.newTodolistTitle, filter: "all"}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map((el) => el.id === action.id ? {...el, title: action.changeTodolistTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map((el) => el.id === action.id ? {...el, filter: action.newTodolistFilter} : el)
        }
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
