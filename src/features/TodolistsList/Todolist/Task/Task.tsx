import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@material-ui/core";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import { Delete } from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api.type";

type TaskPropsType = {
  removeTask: (todolistId: string, taskId: string) => void;
  changeTaskStatus: (
    todolistID: string,
    taskId: string,
    status: number
  ) => void;
  changeSpanTitle: (todolistId: string, taskId: string, title: string) => void;
  task: TaskType;
  todolistId: string;
  key: string;
};
export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = () =>
    props.removeTask(props.todolistId, props.task.id);
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(
      props.todolistId,
      props.task.id,
      e.currentTarget.checked ? 2 : 0
    );
  };
  const onChangeTitleHandler = useCallback(
    (title: string) => {
      props.changeSpanTitle(props.todolistId, props.task.id, title);
    },
    [props.changeSpanTitle, props.todolistId, props.task.id]
  );
  return (
    <div
      key={props.task.id}
      className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
    >
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        onChange={onChangeStatusHandler}
        color="primary"
      />
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
      <IconButton aria-label="delete" onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
