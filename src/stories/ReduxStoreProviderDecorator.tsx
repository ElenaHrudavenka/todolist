import {Provider} from "react-redux";
import {AppRootStateType, store} from "../State/store";
import {combineReducers, createStore} from "redux";
import { tasksReducer } from "../State/tasks-reducer";
import { todolistsReducer } from "../State/todolists-reducer";
import {v1} from "uuid";

/* этого достаточно для отображения компоненты без инициализационного стейта, но это не наглядно
export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}> { storyFn() } </Provider>
}*/

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
