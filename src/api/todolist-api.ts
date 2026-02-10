import axios, { AxiosResponse } from 'axios';
import {
  AuthMeResponseDataType,
  CommonResponseType,
  DataType,
  GetTasksResponseType,
  LoginRequestType,
  LoginResponseDataType,
  TaskType,
  TodolistType,
  UpdateTaskModelType,
} from './todolist-api.type';

//withCredentials определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie)
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '4623b2a3-4d67-46ad-8f38-6b262d0f8ed8',
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
    return instance.post<CommonResponseType<LoginResponseDataType>>(
      '/auth/login',
      data
    );
  },
  logout() {
    return instance.delete<CommonResponseType>('/auth/login');
  },
  authMe() {
    return instance.get<CommonResponseType<AuthMeResponseDataType>>('/auth/me');
  },
};
