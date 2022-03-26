import React from "react";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: "EditableSpan Component",
    component: EditableSpan
}
const onChangeCallBack = action("Value changed")

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={"Start value"} onChange={onChangeCallBack} />
}