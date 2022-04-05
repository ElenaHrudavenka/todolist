import axios from "axios";

//withCredentials определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie)
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '5790b250-3285-44f0-a95a-83b5d2dd95b5',
    }
}
//инкапсулируем логику запросов
export const todolistAPI = {
    getTodolists(){
        let promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },
    createTodolist(title:string){
        let promise = axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {title}, settings)
        return promise
    },
    deleteTodolist(todolistId: string){
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    },
    updateTodolist(todolistId: string, title: string) {
        const promise =
            axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
        return promise
    }
}