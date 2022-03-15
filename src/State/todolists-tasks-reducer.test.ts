import {TasksStateType, TodolistsType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('added todolist', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistState: Array<TodolistsType> = []
    const action = addTodolistAC('title no matter')
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolist).toBe(action.todolistId)
})