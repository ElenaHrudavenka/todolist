import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import React from "react";

export default {
    title: 'Task Component',
    component: Task
}

const removeTaskCallBack = action('Task removed')
const changeTaskStatusCallBack = action("Status changed")
const changeSpanTitleCallBack = action("Span title changed")

export const TaskBaseExample = () => {
    return <>
        <Task removeTask={removeTaskCallBack}
              changeTaskStatus={changeTaskStatusCallBack}
              changeSpanTitle={changeSpanTitleCallBack}
              task={{id: "1", title: "CSS", isDone: true}}
              todolistId = {"todolistId1"}
              key = {"1"}
        />
        <Task removeTask={removeTaskCallBack}
              changeTaskStatus={changeTaskStatusCallBack}
              changeSpanTitle={changeSpanTitleCallBack}
              task={{id:"2", title: "React", isDone: false}}
              todolistId = {"todolistId2"}
              key = {"2"}
        />
    </>
}