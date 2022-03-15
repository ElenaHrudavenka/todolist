import {TasksStateType} from "../App";
import {v1} from "uuid";
import {RemoveTodolistActionType} from "./todolists-reducer";


type removeTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type addTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    newTaskTitle: string
}
type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    title: string
    todolistId: string
}
type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolistId: string
    newTodolistTitle: string
}

//юнион тип
type ActionsType = removeTaskActionType | addTaskActionType |
    changeTaskStatusActionType | changeTaskTitleActionType |
    addTodolistActionType | RemoveTodolistActionType

//при использовании редакса обязательно использовать инициализационный стейт, закидываем в редюсер как
//параметр по умолчанию для стейта
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((el) => el.id !== action.taskId)
            }
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.newTaskTitle, isDone: false};
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            return {...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state

    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

export const addTaskAC = (newTaskTitle: string, todolistId: string): addTaskActionType => {
    return {type: 'ADD-TASK', todolistId, newTaskTitle}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string,): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
/*
export const addTodolistAC = (newTitle:string):addTodolistActionType => {
    return {type: 'ADD-NEW-TODOLIST', newTitle}
}*/
