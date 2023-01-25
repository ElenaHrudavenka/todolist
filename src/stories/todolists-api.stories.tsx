import axios from "axios";
import React, { useEffect, useState } from "react";
import { taskAPI, todolistAPI, UpdateTaskModelType } from "../api/todolist-api";

export default {
  title: "API",
};
//stories for todolists
export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodolists().then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    let title = "newTodolist2";
    todolistAPI.createTodolist(title).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const RemoveTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "107a4dcc-b19d-4224-b8d1-d3b923405675";
    todolistAPI.removeTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "82f91a35-79a5-4662-af14-b29a13ba036c";
    const title = "-- new title 3 --";
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

//stories for tasks
export const PostTask = () => {
  const [tasks, setTasks] = useState<any>(null);
  const todolistId = "ab398e82-9c49-4bcd-aa63-b7f61f7a3f0d";
  const title = "newTaskTitle";
  useEffect(() => {
    taskAPI.createTask(todolistId, title).then((res) => {
      setTasks(res.data.data.item);
    });
  }, []);
  return <div>{JSON.stringify(tasks)}</div>;
};
export const RemoveTask = () => {
  const [state, setState] = useState<any>(null);
  const todolistId = "ab398e82-9c49-4bcd-aa63-b7f61f7a3f0d";
  const taskId = "f0804d9f-8ae0-4bcf-b7de-94aa2262fbd0";
  useEffect(() => {
    taskAPI.removeTask(todolistId, taskId).then((res) => {
      setState(res.data);
    });
  }, []);
  return (
    <div>
      {state !== null
        ? `Task ${taskId} has been deleted`
        : `Task ${taskId} is not found`}
      {/*{JSON.stringify(task)}*/}
    </div>
  );
};
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const todolistId = "ab398e82-9c49-4bcd-aa63-b7f61f7a3f0d";
  const taskId = "a6be60f6-c2bd-46cc-b819-9f15861cb29c";
  const model: UpdateTaskModelType = {
    title: "update title",
    description: "",
    status: 2,
    priority: 0,
    startDate: "",
    deadline: "",
  };

  useEffect(() => {
    taskAPI.updateTask(todolistId, taskId, model).then((res) => {
      setState(res.data.data.item);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
export const GetTasks = () => {
  const [tasks, setTasks] = useState<any>(null);
  const todolistId = "ab398e82-9c49-4bcd-aa63-b7f61f7a3f0d";
  useEffect(() => {
    taskAPI.getTasks(todolistId).then((res) => {
      setTasks(res.data.items);
    });
  }, []);
  return <div>{JSON.stringify(tasks)}</div>;
};
