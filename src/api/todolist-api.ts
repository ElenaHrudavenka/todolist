import axios, { AxiosResponse } from "axios";
import {
  CommonResponseType,
  DataType,
  GetTasksResponseType,
  LoginRequestType, LoginResponseType,
  TaskType,
  TodolistType,
  UpdateTaskModelType,
} from "./todolist-api.type";

//withCredentials определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie)
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "5790b250-3285-44f0-a95a-83b5d2dd95b5",
  },
});

//инкапсулируем логику запросов
export const todolistAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>('todo-lists');
  },
  createTodolist(title: string) {
    return instance.post<
      { title: string },
      AxiosResponse<CommonResponseType<{ item: TodolistType }>>
    >(`todo-lists`, { title });
  },
  removeTodolist(todolistId: string) {
    return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {
      title,
    });
  },
};

export const taskAPI = {
  createTask(todolistId: string, title: string) {
    return instance.post<CommonResponseType<DataType>>(
      `todo-lists/${todolistId}/tasks`,
      { title }
    );
  },
  removeTask(todolistId: string, taskId: string) {
    return instance.delete<CommonResponseType<DataType>>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<
      UpdateTaskModelType,
      AxiosResponse<CommonResponseType<{ item: TaskType }>>
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
  },
};

export const authAPI = {
  login(data: LoginRequestType) {
    return instance.post<CommonResponseType<LoginResponseType>>('/auth/login', data);
  },
};
