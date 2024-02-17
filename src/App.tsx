import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist/Todolist';
import { v1 } from 'uuid';


export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
  let [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false}
  ])

  let [filter, setFilter] = useState<FilterValueType>('all')
  let tasksForTodoList = tasks;

  if(filter === 'active'){
    tasksForTodoList = tasks.filter(t => t.isDone === false)
  }

  if(filter === 'completed'){
    tasksForTodoList = tasks.filter(t => t.isDone === true)
  }

  function addTask(title: string){
    const newTask = {id: v1(), title: title, isDone: false};
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  function removeTask(id: string){
    let filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks)
  }

  function changeFilter(value: FilterValueType){
    setFilter(value)
  }


  return (
    <div className='App'>
      <Todolist 
        title="What to learn" 
        tasks={tasksForTodoList}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}


export default App;