import { v1 } from "uuid";
import {
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  removeTodolistAC,
  todolistsReducer,
} from "./todolists-reducer";
import { FilterValuesType, TodolistDomainType } from "./todolists-reducer.type";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "succeeded",
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "succeeded",
    },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todoliist should be added", () => {
  const newTodolist = {
    id: "QWERTY",
    title: "New todolist title",
    addedDate: "",
    order: 0,
  };
  const endState = todolistsReducer(startState, addTodolistAC(newTodolist));
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolist.title);
  expect(endState[0].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let changeTodolistTitle = "ChangeTodolist";

  /*    const action = {
            type: 'CHANGE-TODOLIST-TITLE' as const, //или явно указать что это константа, а не string
            changeTodolistTitle,
            id: todolistId2
        }
        const endState = todolistsReducer(startState, action)*/
  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC(todolistId2, changeTodolistTitle)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(changeTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newTodolistFilter: FilterValuesType = "completed";

  /*    const action: ChangeTodolistFilterActionType = {  //или явно указать тип экшена
            type: 'CHANGE-TODOLIST-FILTER',
            id: todolistId2,
            newTodolistFilter
        }
        const endState = todolistsReducer(startState, action)*/
  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC(todolistId2, newTodolistFilter)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newTodolistFilter);
});
