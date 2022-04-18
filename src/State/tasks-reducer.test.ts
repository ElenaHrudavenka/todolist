import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                description: '',
                todoListId: "eeeeeeeeeeeee",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: "",
                addedDate: "",
                deadline: ""
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                description: '',
                todoListId: "rrrrrrrrrrrr",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: "",
                addedDate: "",
                deadline: ""
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                description: '',
                todoListId: "wwwwwwwwwwww",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: "",
                addedDate: "",
                deadline: ""
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                description: '',
                todoListId: "vvvvvvvvvvvvv",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: "",
                addedDate: "",
                deadline: ""
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.New,
                description: '',
                todoListId: "aaaaaaaaaaaaa",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: "",
                addedDate: "",
                deadline: ""
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                description: '',
                todoListId: "ccccccccccc",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: "",
                addedDate: "",
                deadline: ""
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2")
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(2)
    expect(endState["todolistId2"].every(el => el.id !== "2")).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    let newTask = {
        id: "w1w1w1w1w1w1",
        title: "juice",
        description: '',
        todoListId: "todolistId2",
        order: 0,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        addedDate: "",
        deadline: ""
    }
    const action = addTaskAC(newTask)
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("juice")
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2")
    const endState = tasksReducer(startState, action)
    /*expect(endState["todolistId2"][1].isDone).toBeFalsy()*/
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New)
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)

})

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC("2", "milkiway", "todolistId2")
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId2"][1].title).toBe("milkiway")
    expect(endState["todolistId1"][1].title).toBe("JS")


})

test('new property with new array should be added when new todolist is added', () => {
    const newTodolist = {
        id: "QWERTY",
        title: "New todolist title",
        addedDate: "",
        order: 0,
    }
    const action = addTodolistAC(newTodolist);
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

