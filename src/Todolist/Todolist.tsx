import React from "react";
import './Todolist.css';

type PropsType = {
    title: string
    tasks: TaskType[]
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
        <li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
        <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
        <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>
      </ul>
      <div className="buttons">
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  }