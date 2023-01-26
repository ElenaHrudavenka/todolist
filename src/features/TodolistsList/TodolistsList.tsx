import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistTC, fetchTodosTC,
    removeTodolistTC
} from "../../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from "../../state/tasks-reducer";
import {FilterValuesType, TodolistDomainType} from "../../state/todolists-reducer.type";
import {AppRootStateType} from "../../app/store";
import {TasksStateType} from "../../app/App";

const TodolistsList = () => {

    const dispatch = useDispatch();  //т.к.редюсеры сработают все, то нам нужен только один диспач
    /*  let todolistId1 = v1();
        let todolistId2 = v1();

        let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
                {id: todolistID1, title: 'What to learn', filter: 'all'},
                {id: todolistID2, title: 'What to buy', filter: 'all'},
            ])
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
    useEffect(() => {
        dispatch(fetchTodosTC());
    }, [dispatch]);
    // AppRootStateType тип нашего стейта и должен возвратиться массив TasksStateType
    const tasks = useSelector<AppRootStateType, TasksStateType>(
        (state) => state.tasks
    );
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
        (state) => state.todolists
    );
    /*  Почему не стоит получать весь стейт. По сути мы подписываемся на изменения всего стейта, и при любом изменении в
          стейте компоненты будут перерисовываться, даже если это не нужно,
          т.е. нужно для каждого отдельного свойства стейта доставать его через свой useSelector, избежим ненужных перерисовок
          Можно сделать с деструктуризацией (хороший способ)
          const {tasks, todolists} = useSelector<AppRootStateType, AppRootStateType>(state => state)
          */
    const addTodolist = useCallback(
        (newTitle: string) => {
            dispatch(createTodolistTC(newTitle));
        },
        [dispatch]
    );
    const removeTodo = useCallback(
        function (todolistId: string) {
            dispatch(removeTodolistTC(todolistId));
        },
        [dispatch]
    );
    const changeTodoTitle = useCallback(
        function (todolistID: string, title: string) {
            dispatch(changeTodolistTitleTC(todolistID, title));
        },
        [dispatch]
    );
    const removeTask = useCallback(
        function (todolistId: string, id: string) {
            dispatch(removeTaskTC(id, todolistId));
        },
        [dispatch]
    );
    const addTask = useCallback(
        function (todolistId: string, title: string) {
            dispatch(addTaskTC(title, todolistId));
        },
        [dispatch]
    );
    const changeStatus = useCallback(
        function (todolistID: string, taskId: string, status: number) {
            dispatch(changeTaskStatusTC(todolistID, status, taskId));
        },
        [dispatch]
    );
    const changeSpanTitle = useCallback(
        function (todolistId: string, taskId: string, title: string) {
            dispatch(changeTaskTitleTC(taskId, title, todolistId));
        },
        [dispatch]
    );
    const changeFilter = useCallback(
        function (todolistId: string, newTodolistFilter: FilterValuesType) {
            dispatch(changeTodolistFilterAC(todolistId, newTodolistFilter));
        },
        [dispatch]
    );

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm callBack={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((el, index) => {
                    let tasksForTodolist = tasks[el.id];
                    /* Перенесла проверку фильтра el.filter === ... в компоненту Todolist, т.к. filter возвращает новый массив и если
                                    active или completed, то перерисуются все тудулисты */
                    return (
                        <Grid item key={el.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
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
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default TodolistsList;