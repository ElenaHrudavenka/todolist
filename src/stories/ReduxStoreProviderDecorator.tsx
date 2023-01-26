import { Provider } from "react-redux";
import { AppRootStateType, store } from "../app/store";
import { combineReducers, createStore } from "redux";
import { tasksReducer } from "../state/tasks-reducer";
import { todolistsReducer } from "../state/todolists-reducer";
import { v1 } from "uuid";

/* этого достаточно для отображения компоненты без инициализационного стейта, но это не наглядно
export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}> { storyFn() } </Provider>
}*/

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

const initialGlobalState = {
  todolists: [
    {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
    },
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: 2,
        description: "",
        todoListId: "rrrrrrrrrrrr",
        order: 0,
        priority: 0,
        startDate: "",
        addedDate: "",
        deadline: "",
      },
      {
        id: v1(),
        title: "JS",
        status: 2,
        description: "",
        todoListId: "nnnnnnnnnnnn",
        order: 0,
        priority: 0,
        startDate: "",
        addedDate: "",
        deadline: "",
      },
    ],
    ["todolistId2"]: [
      {
        id: v1(),
        title: "Milk",
        status: 2,
        description: "",
        todoListId: "eeeeeeeee",
        order: 0,
        priority: 0,
        startDate: "",
        addedDate: "",
        deadline: "",
      },
      {
        id: v1(),
        title: "React Book",
        status: 2,
        description: "",
        todoListId: "qqqqqqqqqqq",
        order: 0,
        priority: 0,
        startDate: "",
        addedDate: "",
        deadline: "",
      },
    ],
  },
};

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppRootStateType
);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
);
