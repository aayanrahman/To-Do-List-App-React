import './App.css';
import TaskForm from './TaskForm';
import Task from './Task'
import {useEffect, useState} from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  // Saving all tasks to local storage
  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks || []);
  }, [])


  //Creating tasks 
  function addTask(name) {
    setTasks(prev => {
      return [...prev, {name: name, done:false}]; 
    })
  }

  return (
   <main>
    <TaskForm onAdd ={addTask}/>
    {tasks.map(task => (
      <Task {...task}/>
    ))}

   </main>
  );
}

export default App;
