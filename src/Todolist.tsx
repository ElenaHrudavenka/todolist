import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Button} from "@mui/material";
import {Task} from "./Task";
import {FilterValuesType} from "./State/todolists-reducer";
import {TaskStatuses, TaskType} from "./api/todolist-api";

/*export type TaskType = {
    id: string
    title: string
    isDone: boolean
}*/

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    removeTodo: (todolistID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: number) => void
    filter: FilterValuesType
    changeSpanTitle: (todolistID: string, taskId: string, title: string) => void
    changeTodoTitle: (todolistID: string, todoTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

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

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistId, "all"), [props.changeFilter, props.todolistId])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistId, "active"), [props.changeFilter, props.todolistId])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistId, "completed"), [props.changeFilter, props.todolistId])
    const onClickHandlerForDeleteTodo = () => props.removeTodo(props.todolistId)
    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [props.addTask, props.todolistId])
    const changeTodoTitleHandler = useCallback((title: string) => {
        props.changeTodoTitle(props.todolistId, title)
    }, [props.changeTodoTitle, props.todolistId])

    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);

    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodoTitleHandler}/>
            {/*<button onClick={onClickHandlerForDeleteTodo}>x</button>*/}
            <IconButton onClick={onClickHandlerForDeleteTodo}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        {/*<div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>*/
        }

        <div>
            {
               /* tasksForTodolist?.map(el => {*/
                tasksForTodolist.map(el => {
                    return <Task removeTask={props.removeTask}
                                 changeTaskStatus={props.changeTaskStatus}
                                 changeSpanTitle={props.changeSpanTitle}
                                 task={el}
                                 todolistId = {props.todolistId}
                                 key = {el.id}
                    />

                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "text"} onClick={onAllClickHandler}
                    color="success">All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "text"} onClick={onActiveClickHandler}
                    color="error">Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}>Complited</Button>

            {/* <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>*/}
        </div>
    </div>
})

