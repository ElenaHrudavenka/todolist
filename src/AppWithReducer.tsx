import React, {useReducer, useState} from "react";
/*
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import { Container, Grid, Paper} from "@material-ui/core";
import ButtonAppBar from "./Components/ButtonAppBar";
import {
    addTodolistAC,
    changeTodolistAC,
    changeTodolistFilterAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "./State/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";


/!*export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}*!/
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate:'', order:0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate:'', order:0},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    /!*let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);*!/
    /!*   let [todolists, setTodolists] = useState<Array<TodolistsType>>([
           {id: v1(), title: 'What to learn', filter: 'all'},
           {id: v1(), title: 'What to buy', filter: 'all'},
       ])*!/

    // let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTodo(todolistId: string) {
        //setTodolists(todolists.filter((el) => el.id !== todolistId))
        let action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    function changeTodoTitle(todolistID: string, title: string) {
        //setTodolists(todolists.map((el) => el.id === todolistID ? {...el, title} : el))
        let action = changeTodolistAC(todolistID, title)
        dispatchToTodolists(action)
    }

    function removeTask(todolistID: string, id: string) {
        /!*let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);*!/
        /!* перенесли логику в редюсер
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter((el) => el.id !== id)})*!/
        let action = removeTaskAC(id, todolistID)
        dispatchToTasks(action)
    }

    function addTask(todolistID: string, title: string) {
        /!*      let newTasks = [task, ...tasks];
        setTasks(newTasks);*!/
        /!*        let newTask = {id: v1(), title: title, isDone: false};
                setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})*!/
        dispatchToTasks(addTaskAC(title, todolistID))

    }

    const addTodolist = (newTitle: string) => {
        /!*        let newID = v1()
                let newTodolist: TodolistsType = {id: newID, title: newTitle, filter: "all"}
                setTodolists([newTodolist, ...todolists])
                setTasks({[newID]: [], ...tasks})*!/
        let action = addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }


    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        /!*      let task = tasks.find(t => t.id === taskId);
                if (task) {
                    task.isDone = isDone;
               }
               setTasks([...tasks]);*!/
        /!*setTasks({...tasks, [todolistID]: tasks[todolistID].map((el) => el.id === taskId ? {...el, isDone} : el)})*!/
        dispatchToTasks(changeTaskStatusAC(taskId,isDone,todolistID))
    }

    function changeSpanTitle(todolistId: string, taskID: string, title: string) {
        /!*setTasks({...tasks, [todolistId]: tasks[todolistId].map((el) => el.id === taskID ? {...el, title} : el)})*!/
        dispatchToTasks(changeTaskTitleAC(taskID,title,todolistId))
    }

    /!*   if (filter === "active") {
           tasksForTodolist = tasks.filter(t => t.isDone === false);
       }
       if (filter === "completed") {
           tasksForTodolist = tasks.filter(t => t.isDone === true);
       }*!/

    function changeFilter(todolistID: string, newTodolistFilter: FilterValuesType) {
        // setFilter(value);
        /!*setTodolists(todolists.map((el) => el.id === todolistID ? {...el, filter: value} : el))*!/
        dispatchToTodolists(changeTodolistFilterAC(todolistID,newTodolistFilter))
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
                                <Grid item>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist
                                            key={index}
                                            todolistId={el.id}
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

export default AppWithReducer;
*/
