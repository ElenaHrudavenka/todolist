import { applyMiddleware, combineReducers, createStore } from "redux";
import { tasksReducer } from "../state/tasks-reducer";
import { todolistsReducer } from "../state/todolists-reducer";
import thunk from "redux-thunk";

//объединяем наши редюсеры в единственный объект-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

//создаем store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// автоматически определяем тип нашего объекта состояния (нашего стейта)
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
