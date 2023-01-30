export type CommonResponseType<T = {}> = {
  resultCode: number;
  fieldsErrors: string[];
  messages: string[];
  data: T;
};
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
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
  id: string;
  title: string;
  description: string;
  todoListId: string;
  order: number;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  addedDate: string;
  deadline: string;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};
export type DataType = {
  item: TaskType;
};
export type GetTasksResponseType = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
// LoginParamsType
export type LoginRequestType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};
export enum resultCode {
  "OK",
  "request is invalid",
  "request is invalid and captcha is required" = 10,
}
export type LoginResponseType = {
  resultCode: resultCode;
  messages: [];
  data: {
    userId: number;
  };
};
