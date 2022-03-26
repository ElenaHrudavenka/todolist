import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

//объединяем наши редюсеры в единственный объект-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

//создаем store
export const store = createStore(rootReducer)
// автоматически определяем тип нашего объекта состояния (нашего стейта)
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;