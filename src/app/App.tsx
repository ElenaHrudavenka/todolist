import React, { useCallback, useEffect } from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import ButtonAppBar from "../components/ButtonAppBar";
import { TaskType } from "../api/todolist-api";
import TodolistsList from "../features/TodolistsList/TodolistsList";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
          <TodolistsList />
      </Container>
    </div>
  );
}

export default App;
