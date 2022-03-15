import React, {useReducer, useState} from "react";
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Container, Grid, Paper} from "@material-ui/core";
import ButtonAppBar from "./Components/ButtonAppBar";
import {
    addTodolistAC,
    changeTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./State/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([

    /* Используем useReducer, закоментировала т.к. переходим на  useSelector и Redux
    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ])*/

    /* Используем useReducer, закоментировала т.к. переходим на  useSelector и Redux
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
            [todolistID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), title: "HTML&CSS2", isDone: true},
                {id: v1(), title: "JS2", isDone: true},
                {id: v1(), title: "ReactJS2", isDone: false},
                {id: v1(), title: "Rest API2", isDone: false},
                {id: v1(), title: "GraphQL2", isDone: false},
            ]
        });*/

// AppRootStateType тип нашего стейта и должен возвратиться массив TasksStateType
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolist)

/*    // Почему не стоит делать так:
    const state = useSelector<AppRootStateType, AppRootStateType>(state => state)
    const ta = state.tasks
    const to = state.todolist
    По сути мы подписываемся на изменения всего стейта, и при любом изменении в стейте компоненты будут перерисовываться, даже если это не нужно,
    т.е. нужно для каждого отдельного свойства стейта доставать его через свой useSelector, избежим ненужных перерисовок

    но вроде можно сделать с деструктуризацией, и прямо красота
    const {tasks, todolists} = useSelector<AppRootStateType, AppRootStateType>(state => state)

    */
    const dispatch = useDispatch()

    function removeTodo(todolistID: string) {
        let action = removeTodolistAC(todolistID)

/*      dispatchToTodolists(action)
        dispatchToTasks(action)
        т.к.редюсеры сработают все, то нам нужен только один диспач */
        dispatch(action)
    }

    function changeTodoTitle(todolistID: string, title: string) {
        let action = changeTodolistAC(todolistID, title)
        // dispatchToTodolists(action)
        dispatch(action)
    }

    function removeTask(todolistID: string, id: string) {
        let action = removeTaskAC(id, todolistID)
        //dispatchToTasks(action)
        dispatch(action)
    }

    function addTask(todolistID: string, title: string) {
        //dispatchToTasks(addTaskAC(title, todolistID))
        dispatch(addTaskAC(title, todolistID))

    }

    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle)
       /* dispatchToTodolists(action)
        dispatchToTasks(action)*/
        dispatch(action)
    }


    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        // dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistID))
        dispatch(changeTaskStatusAC(taskId, isDone, todolistID))
    }

    function changeSpanTitle(todolistID: string, taskID: string, title: string) {
        // dispatchToTasks(changeTaskTitleAC(taskID, title, todolistID))
        dispatch(changeTaskTitleAC(taskID, title, todolistID))
    }

    function changeFilter(todolistID: string, newTodolistFilter: FilterValuesType) {
        // dispatchToTodolists(changeTodolistFilterAC(todolistID, newTodolistFilter))
        dispatch(changeTodolistFilterAC(todolistID, newTodolistFilter))
    }


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((el, index) => {
                            let tasksForTodolist = tasks[el.id];
                            if (el.filter === "active") {
                                tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                            }
                            if (el.filter === "completed") {
                                tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                            }

                            return (
                                <Grid item key = {el.id}>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist
                                            todolistID={el.id}
                                            title={el.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            removeTodo={removeTodo}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={el.filter}
                                            changeSpanTitle={changeSpanTitle}
                                            changeTodoTitle={changeTodoTitle}
                                        />
                                    </Paper>
                                </Grid>)
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;