import React, {useState} from "react";
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Container, Grid, Paper} from "@material-ui/core";
import ButtonAppBar from "./Components/ButtonAppBar";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
    });

    /*let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);*/
    /*   let [todolists, setTodolists] = useState<Array<TodolistsType>>([
           {id: v1(), title: 'What to learn', filter: 'all'},
           {id: v1(), title: 'What to buy', filter: 'all'},
       ])*/
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTodo(todolistID: string) {
        setTodolists(todolists.filter((el) => el.id !== todolistID))
    }

    function changeTodoTitle(todolistID: string, title: string) {
        setTodolists(todolists.map((el) => el.id === todolistID ? {...el, title} : el))
    }

    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter((el) => el.id !== id)})
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        //    setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})

        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    const addTodolist = (newTitle: string) => {
        let newID = v1()
        let newTodolist: TodolistsType = {id: newID, title: newTitle, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({[newID]: [], ...tasks})
    }


    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        // setTasks([...tasks]);
        setTasks({...tasks, [todolistID]: tasks[todolistID].map((el) => el.id === taskId ? {...el, isDone} : el)})
    }

    function changeSpanTitle(todolistID: string, taskID: string, title: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map((el) => el.id === taskID ? {...el, title} : el)})
    }

    /*   if (filter === "active") {
           tasksForTodolist = tasks.filter(t => t.isDone === false);
       }
       if (filter === "completed") {
           tasksForTodolist = tasks.filter(t => t.isDone === true);
       }*/

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map((el) => el.id === todolistID ? {...el, filter: value} : el))
        // setFilter(value);
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

export default App;
