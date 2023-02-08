import React, { useEffect } from 'react';
import './App.css';
import { CircularProgress, Container } from '@material-ui/core';
import ButtonAppBar from '../components/ButtonAppBar';
import { TodolistsList } from '../features/TodolistsList/TodolistsList';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../features/Login/Login';
import ErrorSnackbar from '../components/ErrorSnackbar/ErrorSnackbar';
import { TaskType } from '../api/todolist-api.type';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAppTC } from '../state/app-reducer';
import { AppRootStateType } from './store';
import { logoutTC } from '../state/auth-reducer';
import { RequestStatusType } from '../state/app-reducer.type';
import PageNotFound from '../components/PageNotFound/PageNotFound';

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const dispatch = useDispatch();
  const isInitialized = useSelector<AppRootStateType, boolean>(
    (state) => state.app.isInitialized
  );
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );
  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  const logoutHandler = () => {
    dispatch(logoutTC());
  };
  return (
    <>
      <ErrorSnackbar />
      <ButtonAppBar
        logoutHandler={logoutHandler}
        status={status}
        isLoggedIn={isLoggedIn}
      />
      <Container fixed>
        <Routes>
          <Route path='/' element={<TodolistsList />} />
          <Route path='/todolist' element={<TodolistsList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/404' element={<PageNotFound />} />
          <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
