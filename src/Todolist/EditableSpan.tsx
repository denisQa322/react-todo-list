import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react"

type EditableSpanType={
    title: string
    onChange: (newValue: string) => void
  }

export  function EditableSpan (props: EditableSpanType){

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    };
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title);
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return  editMode
    ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus={true}/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
  }