import React from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import ButtonAppBar from "../components/ButtonAppBar";
import TodolistsList from "../features/TodolistsList/TodolistsList";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Login } from "../features/Login/Login";
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {TaskType} from "../api/todolist-api.type";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <ErrorSnackbar />
        <ButtonAppBar />
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
