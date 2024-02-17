import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './Todolist.css';
import { FilterValueType } from "../App";

type PropsType = {
    title: string
    tasks: TaskType[]
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
}

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export function Todolist(props: PropsType){

    let [newTaskTitle, setNewTaskTitle] = useState('');

    const onChangehandler = (e: ChangeEvent<HTMLInputElement>) =>{
      setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.charCode === 13){
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
      }
    }

    const addTask = () => {
      props.addTask(newTaskTitle);
      setNewTaskTitle('')
    }
    
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return <div className="todolist"> 
      <h3 className="todolist_header">{props.title}</h3>
      <div className="inputs">
        <input 
          className="inputs_mainInput" 
          type="text" 
          value = {newTaskTitle} 
          onChange={onChangehandler}
          onKeyPress={onKeyPressHandler}
          placeholder="Write something"
        />
        <input 
          onClick={addTask} 
          className="inputs_add" 
          type="button" 
          value='+'
        />
      </div>
      <ul className="todolist_list">
        {
          props.tasks.map(t => {

          const onRemoveHandler = () => {
            
            props.removeTask(t.id)
          }

          return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/> 
            <span>{t.title}</span>
            <button onClick={onRemoveHandler}>X</button>
          </li>})
        }
      </ul>
      <div className="buttons">
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  }