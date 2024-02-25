import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './Todolist.css';
import { FilterValueType } from "../App";

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    changeTaskStatus:(id: string, isDone: boolean, todolistId: string) => void
    removeTodolist:(todolistId: string) => void
    filter: FilterValueType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export function Todolist(props: PropsType){

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
      setError('')
      setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter' && newTaskTitle.trim() !== ''){
        props.addTask(newTaskTitle, props.id);
        setNewTaskTitle('');
      }else{
        setError('Title is required!')
      }
    }

    const addTask = () => {
      if(newTaskTitle.trim() !== ''){ 
        props.addTask(newTaskTitle, props.id);
        setNewTaskTitle('')
      }else{
        setError('Title is required!')
      }
    }
    
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id) 
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => {
      props.removeTodolist(props.id)
    }

    const tasks = props.tasks.map(t => {
      const onRemoveHandler = () => {
        props.removeTask(t.id, props.id)
      }

      const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue: boolean = e.currentTarget.checked
        props.changeTaskStatus(t.id, newIsDoneValue, props.id)
      }

      return <li 
        className={t.isDone ? 'is-done' : ''}
        key={t.id}>
        <input 
          type="checkbox" 
          checked={t.isDone}
          onChange={onChangeStatus}
        /> 
        <span>{t.title}</span>
        <button className="btn delete" onClick={onRemoveHandler}>X</button>
      </li>})
    

    return (
    <div className="todolist"> 
      <h3 className="todolist_header">
        {props.title}
        <button 
          className="btn delete_todolist"
          onClick={removeTodolist}
          >
            X</button>
      </h3>
      <div className="inputs">
        <input 
          className="inputs_mainInput" 
          type="text" 
          value = {newTaskTitle} 
          onChange={onChangeHandler}
          onKeyUp={onKeyPressHandler}
          placeholder="Write something"
        />
        <input 
          onClick={addTask} 
          className="inputs_add" 
          type="button" 
          value='+'
        />
      </div>
      {error && <div className="error">{error}</div>}
      <ul className="todolist_list">
        {tasks}
      </ul>
      <div className="buttons">
        <button 
          onClick={onAllClickHandler}
          className={props.filter === 'all' ? 'active-filter' : ''}
        >
          All
        </button>
        <button 
          onClick={onActiveClickHandler}
          className={props.filter === 'active' ? 'active-filter' : ''}
        >
          Active
        </button>
        <button 
          onClick={onCompletedClickHandler}
          className={props.filter === 'completed' ? 'active-filter' : ''}
        >
          Complete
        </button>
      </div>
    </div>
    )
  }
