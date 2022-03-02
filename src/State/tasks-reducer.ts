import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
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

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionsType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((el) => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: v1(), title: action.newTodolistTitle, filter: "all"}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map((el) => el.id === action.id ? {...el, title: action.changeTodolistTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map((el) => el.id === action.id ? {...el, filter: action.newTodolistFilter} : el)
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistID1: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistID1}
}

export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', newTodolistTitle}
}

export const ChangeTodolistAC = (todolistID2: string, changeTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        changeTodolistTitle,
        id: todolistID2
    }
}
export const ChangeTodolistFilterAC = (todolistID2: string, newTodolistFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistID2,
        newTodolistFilter
    }
}


/*export const incrementAgeAC = () => {
    return {
        type: 'INCREMENT-AGE'
    }
}*/
