import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeSpanTitle: (todolistId: string, taskId: string, title: string) => void
    task: TaskType
    todolistId: string
    key: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.todolistId, props.task.id)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked);
    }
    const onChangeTitleHandler = useCallback((title: string) => {
        props.changeSpanTitle(props.todolistId, props.task.id, title);
    }, [props.changeSpanTitle, props.todolistId,props.task.id])
    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox checked={props.task.isDone}
                  onChange={onChangeStatusHandler}
                  color="primary"
        />
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})