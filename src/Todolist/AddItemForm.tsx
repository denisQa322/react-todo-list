import React,{ChangeEvent, KeyboardEvent, useState} from "react";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType){
    
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
      setError('')
      setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter' && newTaskTitle.trim() !== ''){
        props.addItem(newTaskTitle);
        setNewTaskTitle('');
      }else{
        setError('Title is required!')
      }
    }

    const addItem = () => {
      if(newTaskTitle.trim() !== ''){ 
        props.addItem(newTaskTitle);
        setNewTaskTitle('')
      }else{
        setError('Title is required!')
      }
    }

    return (
        <div>
            <div className="inputs">
                <TextField 
                    variant={'outlined'}
                    value = {newTaskTitle} 
                    onChange={onChangeHandler}
                    onKeyUp={onKeyPressHandler}
                    label={"Add what you need"}
                    error={!!error}
                    helperText={error}
                    />
                <IconButton onClick={addItem} color={'primary'}>
                  <ControlPoint />
                </IconButton>
            </div>
    </div>
    )
}