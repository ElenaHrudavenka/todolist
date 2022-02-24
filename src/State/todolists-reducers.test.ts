import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../App";
import {
    AddTodolistAC,
    ChangeTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistFilterActionType,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducers";

test('correct todolist should be removed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todoliist should be added', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let newTodolistTitle = "New Todolist"

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe("all")
})

test('correct todolist should change its name', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let changeTodolistTitle = "ChangeTodolist"

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    /*    const action = {
            type: 'CHANGE-TODOLIST-TITLE' as const, //или явно указать что это константа, а не string
            changeTodolistTitle,
            id: todolistID2
        }
        const endState = todolistsReducer(startState, action)*/
    const endState = todolistsReducer(startState, ChangeTodolistAC(todolistID2, changeTodolistTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(changeTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let newTodolistFilter: FilterValuesType = "completed"

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: "all"},
        {id: todolistID2, title: 'What to buy', filter: "all"},
    ]
    /*    const action: ChangeTodolistFilterActionType = {  //или явно указать тип экшена
            type: 'CHANGE-TODOLIST-FILTER',
            id: todolistID2,
            newTodolistFilter
        }
        const endState = todolistsReducer(startState, action)*/
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistID2, newTodolistFilter))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newTodolistFilter)
})