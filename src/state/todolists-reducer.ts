import {todolistAPI, TodolistType} from './../api/todolist-api'
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    newTodolist: TodolistType,
    filter: FilterValuesType
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
            return action.todos.map(el => ({...el, filter: "all"}))
        case 'REMOVE-TODOLIST':
            return state.filter((el) => el.id !== action.id)
        case 'ADD-TODOLIST':
            //let newTodolistWithFilter = action.newTodolist, filter:"all"
            return [{...action.newTodolist, filter: action.filter}, ...state]
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

export const addTodolistAC = (newTodolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', newTodolist, filter: "all"}
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
// thunk
export const fetchTodosTC = () => (dispach: Dispatch)=> {
    todolistAPI.getTodolists()
        .then((res) => {
            let todos = res.data
            dispach(setTodolistsAC(todos))
        })
}

export const deleteTodolistTC = (todolistId:string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const createTodolistTC = (title:string) => (dispatch: Dispatch) => {
  todolistAPI.createTodolist(title)
      .then((res) => {
          let newTodolist = res.data.data.item
          dispatch(addTodolistAC(newTodolist))
      })
}