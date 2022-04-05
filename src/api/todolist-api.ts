import axios from "axios";

//withCredentials определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie)
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5790b250-3285-44f0-a95a-83b5d2dd95b5',
    }
})

type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}
type CommonResponseType<T = {}> = {
    resultCode: number,
    fieldsErrors: string[],
    messages: string[],
    data: T,
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
    getTodolists(){
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodolist(title:string){
        return instance.post<CommonResponseType<{item: TodoType}>>( `todo-lists`, {title})
    },
    deleteTodolist(todolistId: string){
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    }
}
