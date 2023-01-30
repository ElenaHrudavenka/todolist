import React, { useCallback, useEffect } from "react";
import { AddItemForm } from "../../../components/AddItemForm/AddItemForm";
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Button } from "@mui/material";
import { Task } from "./Task/Task";
import { fetchTasksTC } from "../../../state/tasks-reducer";
import { useDispatch } from "react-redux";
import { FilterValuesType } from "../../../state/todolists-reducer.type";
import { RequestStatusType } from "../../../state/app-reducer.type";
import {TaskStatuses, TaskType} from "../../../api/todolist-api.type";

type PropsType = {
  todolistId: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (todolistID: string, taskId: string) => void;
  removeTodo: (todolistID: string) => void;
  changeFilter: (todolistID: string, value: FilterValuesType) => void;
  addTask: (todolistID: string, title: string) => void;
  changeTaskStatus: (
    todolistID: string,
    taskId: string,
    status: number
  ) => void;
  filter: FilterValuesType;
  changeSpanTitle: (todolistID: string, taskId: string, title: string) => void;
  changeTodoTitle: (todolistID: string, todoTitle: string) => void;
  entityStatus: RequestStatusType;
};

export const Todolist = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasksTC(props.todolistId));
  }, []);

  const onAllClickHandler = useCallback(
    () => props.changeFilter(props.todolistId, "all"),
    [props.changeFilter, props.todolistId]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter(props.todolistId, "active"),
    [props.changeFilter, props.todolistId]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter(props.todolistId, "completed"),
    [props.changeFilter, props.todolistId]
  );
  const onClickHandlerForDeleteTodo = () => props.removeTodo(props.todolistId);
  const addTaskHandler = useCallback(
    (title: string) => {
      props.addTask(props.todolistId, title);
    },
    [props.addTask, props.todolistId]
  );
  const changeTodoTitleHandler = useCallback(
    (title: string) => {
      props.changeTodoTitle(props.todolistId, title);
    },
    [props.changeTodoTitle, props.todolistId]
  );

  let tasksForTodolist = props.tasks;
  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(
      (t) => t.status === TaskStatuses.Completed
    );
  }
  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodoTitleHandler} />
        <IconButton
          onClick={onClickHandlerForDeleteTodo}
          disabled={props.entityStatus === "loading"}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm
        callBack={addTaskHandler}
        disabled={props.entityStatus === "loading"}
      />
      <div>
        {
          /*tasksForTodolist?.map((el) => {*/
          tasksForTodolist?.map((el) => {
            return (
              <Task
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeSpanTitle={props.changeSpanTitle}
                task={el}
                todolistId={props.todolistId}
                key={el.id}
              />
            );
          })
        }
      </div>
      <div>
        <Button
          variant={props.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
          color="success"
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color="error"
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
        >
          Complited
        </Button>
      </div>
    </div>
  );
});
