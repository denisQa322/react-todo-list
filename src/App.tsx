import React, { useState } from 'react';
import './App.css';
import { v1 } from 'uuid';

import { TaskType, Todolist } from './Todolist/Todolist';


export type FilterValueType = 'all' | 'active' | 'completed';

type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  function addTask(title: string, todolistId: string){
    let task = {id: v1(), title: title, isDone: false};
    let tasks = tasksObj[todolistId];
    const newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj})
  }

  function removeTask(id: string, todolistId: string){
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(t => t.id !== id);
    tasksObj[todolistId]= filteredTasks;
    setTasks({...tasksObj})
  }

  function changeFilter(value: FilterValueType, todolistId: string){
    let todolist = todolists.find(tl => tl.id === todolistId);
    if(todolist){
      todolist.filter = value;
      setTodoLists([...todolists])
    }
  }

  const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    const newTasks: TaskType[] = tasks.map(t => t.id === id ? {...t, isDone: isDone} : t)
    setTasks({...tasksObj, [todolistId]: newTasks});
  }

  let todolistId1 = v1();
  let todolistId2 = v1();


  let [todolists, setTodoLists] = useState<Array<TodolistType>>([
      { id: todolistId1, title:"What to learn", filter: "all"},
      { id: todolistId2, title:"What to buy", filter: "all"}
    ])

    let removeTodolist = (todolistId: string) => {
      let filteredTodolist = todolists.filter( tl => tl.id !== todolistId)
      setTodoLists(filteredTodolist);

      delete tasksObj[todolistId];
      setTasks({...tasksObj});
    }

  let[tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: false},
      {id: v1(), title: "JS", isDone: false},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false}
    ],
    [todolistId2]:[
      {id: v1(), title: "JS book", isDone: false},
      {id: v1(), title: "Milk", isDone: false},
    ]
  });

  return (
    <div className='App'>

    <input type="text" />
    <button>+</button>

      {
        todolists.map((tl) =>{
          let allTodoListTasks = tasksObj[tl.id];
          let tasksForTodoList = allTodoListTasks;

            if(tl.filter === 'active'){
              tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
            }

            if(tl.filter === 'completed'){
              tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
            }

            return<Todolist 
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
            />
        })
      }
      
    </div>
  );
}


export default App;