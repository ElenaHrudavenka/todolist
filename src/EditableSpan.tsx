import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }


    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        //? <input onBlur={activateViewMode} value={title} autoFocus onChange={onChangeTitleHandler}/>
        ? <TextField value={title}
                     onChange={onChangeTitleHandler}
                     onBlur={activateViewMode}
                     autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}

export default EditableSpan