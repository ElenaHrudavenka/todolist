import axios from "axios";

//withCredentials определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie)
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5790b250-3285-44f0-a95a-83b5d2dd95b5',
    }
})

type CommonResponseType<T = {}> = {
    resultCode: number,
    fieldsErrors: string[],
    messages: string[],
    data: T,
}
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft,
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    later,
}
export type TaskType = {
    id: string,
    title: string,
    description: string,
    todoListId: string,
    order: number,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    addedDate: string,
    deadline: string,
}
type DataType = {
        item: TaskType
}

type GetTasksResponseType = {
    error: string | null,
    totalCount: number,
    items: TaskType[]
}

/*
type CreateTodoResponseType = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[],
    data: {
        item: TodoType
    }
}
type DeleteTodoResponseType = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[],
    data: {}
}
type UpdateTodoResponseType = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[],
    data: {}
}*/

//инкапсулируем логику запросов
export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistType }>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    }
}


export const taskAPI = {
    postTask(todolistId: string, title: string) {
        return instance.post<CommonResponseType<DataType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId:string){
        return instance.delete<CommonResponseType<DataType>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    putTask(todolistId: string, taskId:string, title:string){
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    }
}