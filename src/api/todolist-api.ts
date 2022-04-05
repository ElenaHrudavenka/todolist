import axios from "axios";

//withCredentials определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie)
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5790b250-3285-44f0-a95a-83b5d2dd95b5',
    }
})

//инкапсулируем логику запросов
export const todolistAPI = {
    getTodolists(){
        return instance.get('todo-lists')
    },
    createTodolist(title:string){
        return instance.post(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string){
        return instance.delete(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title})
    }
}