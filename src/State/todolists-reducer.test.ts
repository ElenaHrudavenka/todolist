import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../App";
import {
    addTodolistAC,
    changeTodolistAC, changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistsType>

    beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todoliist should be added', () => {
    let newTodolistTitle = "New Todolist"

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe("all")
})

test('correct todolist should change its name', () => {
    let changeTodolistTitle = "ChangeTodolist"

    /*    const action = {
            type: 'CHANGE-TODOLIST-TITLE' as const, //или явно указать что это константа, а не string
            changeTodolistTitle,
            id: todolistId2
        }
        const endState = todolistsReducer(startState, action)*/
    const endState = todolistsReducer(startState, changeTodolistAC(todolistId2, changeTodolistTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(changeTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newTodolistFilter: FilterValuesType = "completed"

    /*    const action: ChangeTodolistFilterActionType = {  //или явно указать тип экшена
            type: 'CHANGE-TODOLIST-FILTER',
            id: todolistId2,
            newTodolistFilter
        }
        const endState = todolistsReducer(startState, action)*/
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newTodolistFilter))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newTodolistFilter)
})