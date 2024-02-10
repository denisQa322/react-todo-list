import React from "react";
import './Todolist.css';
import { FilterValueType } from "../App";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (value: FilterValueType) => void
}

type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export function Todolist(props: PropsType){
    return <div className="todolist">
      <h3 className="todolist_header">{props.title}</h3>
      <div className="inputs">
        <input className="inputs_mainInput" type="text" placeholder="Write something"/>
        <input className="inputs_add" type="button" value='+'/>
      </div>
      <ul className="todolist_list">
        {
          props.tasks.map(t => <li>
            <input type="checkbox" checked={t.isDone} /> <span>{t.title}</span>
            <button onClick={()=> {props.removeTask(t.id)}}>X</button>
          </li>)
        }
      </ul>
      <div className="buttons">
        <button onClick={() => {props.changeFilter('all')}}>All</button>
        <button onClick={() => {props.changeFilter('active')}}>Active</button>
        <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
      </div>
    </div>
  }