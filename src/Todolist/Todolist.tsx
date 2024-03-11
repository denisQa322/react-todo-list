import React, {ChangeEvent} from "react";
import { FilterValueType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    changeTaskStatus:(id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle:(id: string, newTitle: string, todolistId: string) => void
    removeTodolist:(todolistId: string) => void
    changeTodolistTitle:(todolistId: string, newTitle: string) => void
    filter: FilterValueType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export function Todolist(props: PropsType){

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id) 
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const addTask = (title: string) =>{
      props.addTask(title,props.id)
    }

    const removeTodolist = () => {
      props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle)
    }

    const tasks = props.tasks.map(t => {
      const onRemoveHandler = () => {
        props.removeTask(t.id, props.id)
      }

      const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue: boolean = e.currentTarget.checked
        props.changeTaskStatus(t.id, newIsDoneValue, props.id)
      }
      const onChangeTitleHandler = (newValue: string) => {
        props.changeTaskTitle(t.id, newValue, props.id)
      }

      return <div 
        className={t.isDone ? 'is-done' : ''}
        key={t.id}>
        <Checkbox
          checked={t.isDone}
          onChange={onChangeStatusHandler}
        /> 
        <EditableSpan 
          title={t.title}
          onChange={onChangeTitleHandler}
        />
        <IconButton onClick={onRemoveHandler}>
          <Delete />
        </IconButton>
      </div>})
    

    return (
    <div className="todolist"> 
      <h3 className="todolist_header">
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      <div className="todolist_list">
        {tasks}
      </div>
      <div className="buttons">
        <Button
          variant={props.filter === 'all' ? 'contained' : 'text'} 
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button 
          variant={props.filter === 'active' ? 'contained' : 'text'} 
          color={'primary'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button 
          variant={props.filter === 'completed' ? 'contained' : 'text'} 
          color={'secondary'}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
    )
  }

