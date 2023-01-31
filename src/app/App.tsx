import React, {useEffect} from "react";
import "./App.css";
import {CircularProgress, Container} from "@material-ui/core";
import ButtonAppBar from "../components/ButtonAppBar";
import TodolistsList from "../features/TodolistsList/TodolistsList";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Login } from "../features/Login/Login";
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {TaskType} from "../api/todolist-api.type";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "../state/app-reducer";
import {AppRootStateType} from "./store";
import {logoutTC} from "../state/auth-reducer";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const dispatch = useDispatch();
  const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
  useEffect(()=>{
    dispatch(initializeAppTC());
  },[])
  if (!isInitialized) {
    return <div
        style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }
  const logoutHandler = () => {
    dispatch(logoutTC());
  }
  return (
    <>
      <BrowserRouter>
        <ErrorSnackbar />
        <ButtonAppBar logoutHandler={logoutHandler}/>
        <Container fixed>
          <Routes>
            <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/" element={<TodolistsList />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
