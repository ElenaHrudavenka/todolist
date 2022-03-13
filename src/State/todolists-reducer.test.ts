import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../App";
import {
    addTodolistAC,
    changeTodolistAC, changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

let todolistID1: string
let todolistID2: string
let startState: Array<TodolistsType>

    beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();

    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
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
            id: todolistID2
        }
        const endState = todolistsReducer(startState, action)*/
    const endState = todolistsReducer(startState, changeTodolistAC(todolistID2, changeTodolistTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(changeTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newTodolistFilter: FilterValuesType = "completed"

    /*    const action: ChangeTodolistFilterActionType = {  //или явно указать тип экшена
            type: 'CHANGE-TODOLIST-FILTER',
            id: todolistID2,
            newTodolistFilter
        }
        const endState = todolistsReducer(startState, action)*/
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistID2, newTodolistFilter))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newTodolistFilter)
})