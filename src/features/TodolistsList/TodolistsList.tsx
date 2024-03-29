import React, { useCallback, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';
import { Todolist } from './Todolist/Todolist';
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  createTodolistTC,
  fetchTodosTC,
  removeTodolistTC,
} from '../../state/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTaskTC,
  changeTaskStatusTC,
  changeTaskTitleTC,
  removeTaskTC,
} from '../../state/tasks-reducer';
import {
  FilterValuesType,
  TodolistDomainType,
} from '../../state/todolists-reducer.type';
import { AppRootStateType } from '../../app/store';
import { TasksStateType } from '../../app/App';
import { Navigate } from 'react-router-dom';

export const TodolistsList = React.memo(() => {
  const dispatch = useDispatch(); //т.к.редюсеры сработают все, то нам нужен только один диспач
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
    if (!isLoggedIn) {
      return;
    }
    dispatch(fetchTodosTC());
  }, [dispatch]);
  // AppRootStateType тип нашего стейта и должен возвратиться массив TasksStateType
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );
  const addTodolist = useCallback((newTitle: string) => {
    dispatch(createTodolistTC(newTitle));
  }, []);
  const removeTodo = useCallback(function (todolistId: string) {
    dispatch(removeTodolistTC(todolistId));
  }, []);
  const changeTodoTitle = useCallback(function (
    todolistID: string,
    title: string
  ) {
    dispatch(changeTodolistTitleTC(todolistID, title));
  },
  []);
  const removeTask = useCallback(function (todolistId: string, id: string) {
    dispatch(removeTaskTC(id, todolistId));
  }, []);
  const addTask = useCallback(function (todolistId: string, title: string) {
    dispatch(addTaskTC(title, todolistId));
  }, []);
  const changeStatus = useCallback(function (
    todolistID: string,
    taskId: string,
    status: number
  ) {
    dispatch(changeTaskStatusTC(todolistID, status, taskId));
  },
  []);
  const changeSpanTitle = useCallback(function (
    todolistId: string,
    taskId: string,
    title: string
  ) {
    dispatch(changeTaskTitleTC(taskId, title, todolistId));
  },
  []);
  const changeFilter = useCallback(function (
    todolistId: string,
    newTodolistFilter: FilterValuesType
  ) {
    dispatch(changeTodolistFilterAC(todolistId, newTodolistFilter));
  },
  []);
  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }
  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm callBack={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((el, index) => {
          let tasksForTodolist = tasks[el.id];
          /* Перенесла проверку фильтра el.filter === ... в компоненту Todolist, т.к. filter возвращает новый массив и если
                                    active или completed, то перерисуются все тудулисты */
          return (
            <Grid item key={el.id}>
              <Paper style={{ padding: '10px' }}>
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
                  entityStatus={el.entityStatus}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
});
