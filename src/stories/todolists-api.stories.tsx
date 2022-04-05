import axios from 'axios'
import React, {useEffect, useState} from 'react'

export default {
    title: 'API'
}
//withCredentials определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie)
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '5790b250-3285-44f0-a95a-83b5d2dd95b5',
    },
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = {
            title: 'newTodolist2',
        }
        let promise = axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`, title, settings)
        promise.then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a159e44c-f1a1-48bc-989a-3ef244f9d1c1'
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then((res) =>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='f7ec5c45-758a-4055-9f6a-2095b0e2c171'
        const title = "-- new title --"
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,{title}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
