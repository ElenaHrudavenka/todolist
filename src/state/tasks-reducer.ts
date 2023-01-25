import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodosActionType,
} from "./todolists-reducer";
import {taskAPI, TaskType, UpdateTaskModelType} from "../api/todolist-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";

type removeTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};
type addTaskActionType = {
  type: "ADD-TASK";
  item: TaskType;
};
type changeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  /*isDone: boolean*/
  status: number;
  todolistId: string;
};
type changeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  title: string;
  todolistId: string;
};

type FetchTasksActionType = ReturnType<typeof setTasksAC>;

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
//юнион тип
type ActionsType =
  | removeTaskActionType
  | addTaskActionType
  | changeTaskStatusActionType
  | changeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodosActionType
  | FetchTasksActionType;

//при использовании редакса обязательно использовать инициализационный стейт, закидываем в редюсер как
//параметр по умолчанию для стейта
const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "SET-TASK":
      return {
        ...state,
        [action.todolistId]: action.items,
      };
    case "SET-TODOS": {
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

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): removeTaskActionType => {
  return { type: "REMOVE-TASK", todolistId, taskId };
};

export const addTaskAC = (item: TaskType): addTaskActionType => {
  return { type: "ADD-TASK", item };
};
export const changeTaskStatusAC = (
  taskId: string,
  status: number,
  todolistId: string
): changeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", taskId, status, todolistId };
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): changeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", taskId, title, todolistId };
};
export const setTasksAC = (todolistId: string, items: Array<TaskType>) => {
  return {
    type: "SET-TASK",
    todolistId,
    items,
  } as const;
};
/*
//thunk
export const fetchTasksThunk = (dispatch: Dispatch) => {
    let todolistId = ''
    taskAPI.getTasks(todolistId)
        .then((res) => {
            //dispatch(fetchTasksAC())
        })
}
 - т.к. нам как-то нужно передать todolistId, будем использовать функцию-обертку thunkCreator*/
// thunkCreator (нам нужно передать аргументы для функции)
export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    taskAPI.getTasks(todolistId).then((res) => {
      let items = res.data.items;
      dispatch(setTasksAC(todolistId, items));
    });
  };
};

export const removeTaskTC =
  (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    taskAPI.removeTask(todolistId, taskId).then((res) => {
      dispatch(removeTaskAC(taskId, todolistId));
    });
  };

export const addTaskTC =
  (newTaskTitle: string, todolistId: string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todolistId, newTaskTitle).then((res) => {
      dispatch(addTaskAC(res.data.data.item));
    });
  };

export const changeTaskStatusTC =
  (todolistId: string, status: number, taskId: string) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
      taskAPI.updateTask(todolistId, taskId, model).then((res) => {
        dispatch(changeTaskStatusAC(taskId, status, todolistId));
      });
    }
  };

export const changeTaskTitleTC =
    (taskId: string, title: string, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
      const state = getState();
      const tasksForCurrentTodolist = state.tasks[todolistId];
      const currentTask = tasksForCurrentTodolist.find((el) => {
       return el.id === taskId
     })

      if (currentTask) {
        const model = {
          title,
          description: currentTask.description,
          status: currentTask.status,
          priority: currentTask.priority,
          startDate: currentTask.startDate,
          deadline: currentTask.deadline,
        };
        taskAPI.updateTask(todolistId, taskId, model).then((res) => {
          dispatch(changeTaskTitleAC(taskId, model.title, todolistId))
        })
      }

}