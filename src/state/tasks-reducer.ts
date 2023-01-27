import { taskAPI, TaskType } from "../api/todolist-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "../app/store";
import { TodolistActionsType } from "./todolists-reducer.type";
import { TasksStateType } from "../app/App";
import { TasksActionsType } from "./tasks-reducer.type";
import { setAppStatusAC } from "./app-reducer";
import { AppActionsType } from "./app-reducer.type";

//при использовании редакса обязательно использовать инициализационный стейт, закидываем в редюсер как
//параметр по умолчанию для стейта
const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: TasksActionsType | TodolistActionsType
): TasksStateType => {
  switch (action.type) {
    case "SET-TASK":
      return {
        ...state,
        [action.todolistId]: action.items,
      };
    case "SET-TODOLIST": {
      const stateCopy = { ...state };
      // map тут избыточен, поэтому forEach
      action.todos.map((el) => {
        return (stateCopy[el.id] = []);
      });
      return stateCopy;
    }
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (el) => el.id !== action.taskId
        ),
      };
    case "ADD-TASK":
      return {
        ...state,
        [action.item.todoListId]: [
          action.item,
          ...state[action.item.todoListId],
        ],
      };
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((el) =>
          el.id === action.taskId
            ? {
                ...el,
                /*isDone: action.isDone*/
                status: action.status,
              }
            : el
        ),
      };
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((el) =>
          el.id === action.taskId
            ? {
                ...el,
                title: action.title,
              }
            : el
        ),
      };
    case "ADD-TODOLIST":
      return { ...state, [action.newTodolist.id]: [] };
    case "REMOVE-TODOLIST":
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({ type: "REMOVE-TASK", todolistId, taskId } as const);

export const addTaskAC = (item: TaskType) =>
  ({ type: "ADD-TASK", item } as const);

export const changeTaskStatusAC = (
  taskId: string,
  status: number,
  todolistId: string
) => ({ type: "CHANGE-TASK-STATUS", taskId, status, todolistId } as const);

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
) => ({ type: "CHANGE-TASK-TITLE", taskId, title, todolistId } as const);

export const setTasksAC = (todolistId: string, items: Array<TaskType>) => {
  return {
    type: "SET-TASK",
    todolistId,
    items,
  } as const;
};

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch<TasksActionsType | AppActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    taskAPI.getTasks(todolistId).then((res) => {
      let items = res.data.items;
      dispatch(setTasksAC(todolistId, items));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
};

export const removeTaskTC =
  (taskId: string, todolistId: string) =>
  (dispatch: Dispatch<TasksActionsType | AppActionsType>) => {
    dispatch(setAppStatusAC("succeeded"));
    taskAPI.removeTask(todolistId, taskId).then((res) => {
      dispatch(removeTaskAC(taskId, todolistId));
      dispatch(setAppStatusAC("succeeded"));
    });
  };

export const addTaskTC =
  (newTaskTitle: string, todolistId: string) =>
  (dispatch: Dispatch<TasksActionsType | AppActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    taskAPI.createTask(todolistId, newTaskTitle).then((res) => {
      dispatch(addTaskAC(res.data.data.item));
      dispatch(setAppStatusAC("succeeded"));
    });
  };

export const changeTaskStatusTC =
  (todolistId: string, status: number, taskId: string) =>
  (
    dispatch: Dispatch<TasksActionsType | AppActionsType>,
    getState: () => AppRootStateType
  ) => {
    const state = getState();
    const tasksForCurrentTodolist = state.tasks[todolistId];
    const currentTask = tasksForCurrentTodolist.find((el) => {
      return el.id === taskId;
    });

    if (currentTask) {
      //проверку делаю т.к. find может вернуть undefined
      const model = {
        title: currentTask.title,
        description: currentTask.description,
        status,
        priority: currentTask.priority,
        startDate: currentTask.startDate,
        deadline: currentTask.deadline,
      };
      dispatch(setAppStatusAC("loading"));
      taskAPI.updateTask(todolistId, taskId, model).then((res) => {
        dispatch(changeTaskStatusAC(taskId, status, todolistId));
        dispatch(setAppStatusAC("succeeded"));
      });
    }
  };

export const changeTaskTitleTC =
  (taskId: string, title: string, todolistId: string) =>
  (
    dispatch: Dispatch<TasksActionsType | AppActionsType>,
    getState: () => AppRootStateType
  ) => {
    const state = getState();
    const tasksForCurrentTodolist = state.tasks[todolistId];
    const currentTask = tasksForCurrentTodolist.find((el) => {
      return el.id === taskId;
    });

    if (currentTask) {
      const model = {
        title,
        description: currentTask.description,
        status: currentTask.status,
        priority: currentTask.priority,
        startDate: currentTask.startDate,
        deadline: currentTask.deadline,
      };
      dispatch(setAppStatusAC("loading"));
      taskAPI.updateTask(todolistId, taskId, model).then((res) => {
        dispatch(changeTaskTitleAC(taskId, model.title, todolistId));
        dispatch(setAppStatusAC("succeeded"));
      });
    }
  };
