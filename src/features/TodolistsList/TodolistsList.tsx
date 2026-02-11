import React, { useCallback, useEffect } from 'react';
import { CircularProgress, Grid, Paper } from '@material-ui/core';
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
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );

  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );

  const isInitialized = useSelector<AppRootStateType, boolean>(
    (state) => state.app.isInitialized
  );

  useEffect(() => {
    if (!isLoggedIn || !isInitialized) {
      return;
    }
    dispatch(fetchTodosTC());
  }, [dispatch, isLoggedIn, isInitialized]);

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

  if (!isInitialized) {
    return <CircularProgress style={{ marginTop: '30%' }} />;
  }

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
