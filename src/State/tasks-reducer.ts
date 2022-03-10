import {TasksStateType} from "../App";
import {v1} from "uuid";
import {RemoveTodolistActionType} from "./todolists-reducer";


type removeTaskActionType = {
    type: 'REMOVE-TASK'
    todolistID: string
    taskId: string
}
type addTaskActionType = {
    type: 'ADD-TASK'
    todolistID: string
    newTaskTitle: string
}
type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todolistID: string
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskID: string
    title: string
    todolistID: string
}
type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolistID: string
    newTodolistTitle: string
}

//юнион тип
type ActionsType = removeTaskActionType | addTaskActionType |
    changeTaskStatusActionType | changeTaskTitleActionType |
    addTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskId)}
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.newTaskTitle, isDone: false};
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        case 'CHANGE-TASK-STATUS':
            return {...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistID]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            throw new Error("I don't understand this type")

    }
}

export const removeTaskAC = (taskId: string, todolistID: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID, taskId}
}

export const addTaskAC = (newTaskTitle: string, todolistID: string): addTaskActionType => {
    return {type: 'ADD-TASK', todolistID, newTaskTitle}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string,): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistID}
}
/*
export const addTodolistAC = (newTitle:string):addTodolistActionType => {
    return {type: 'ADD-NEW-TODOLIST', newTitle}
}*/
