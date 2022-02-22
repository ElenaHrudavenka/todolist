import React, {ChangeEvent} from "react";
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    removeTodo: (todolistID: string) => void
    changeFilter: (todolistID:string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID:string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    changeSpanTitle: (todolistID: string, taskId:string, title: string)=>void
    changeTodoTitle: (todolistID: string, todoTitle: string)=>void
}

export function Todolist(props: PropsType) {

/*    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistID, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }*/

 /*   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }*/

    const onAllClickHandler = () => props.changeFilter(props.todolistID,"all")
    const onActiveClickHandler = () => props.changeFilter(props.todolistID,"active")
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID,"completed")
    const onClickHandlerForDeleteTodo = () => props.removeTodo(props.todolistID)
    const addTaskHandler = (title:string) => {props.addTask(props.todolistID,title)}
    const changeTodoTitleHandler = (title:string) => {props.changeTodoTitle(props.todolistID, title)}
    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodoTitleHandler} />
        {/*<button onClick={onClickHandlerForDeleteTodo}>x</button>*/}
        <IconButton onClick={onClickHandlerForDeleteTodo} >
            <Delete />
        </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler} />
        {/*<div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>*/}
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }
                    const onChangeTitleHandler = (title:string) => {
                        props.changeSpanTitle(props.todolistID, t.id, title);
                    }
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox"
                               onChange={onChangeStatusHandler}
                               checked={t.isDone}/>*/}
                        <Checkbox checked={t.isDone}
                                  onChange={onChangeStatusHandler}
                                  color="primary"
                                  />
                        {/*<span>{t.title}---</span>*/}
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "text"} onClick={onAllClickHandler} color="success">All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "text"} onClick={onActiveClickHandler} color="error">Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "text"} onClick={onCompletedClickHandler} >Complited</Button>

           {/* <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>*/}
        </div>
    </div>
}