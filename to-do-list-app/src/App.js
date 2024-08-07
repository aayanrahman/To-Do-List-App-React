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
    setTasks(tasks);
  }, [])


  //Creating tasks 
  function addTask(name) {
    setTasks(prev => {
      return [...prev, {name: name, done:false}]; 
    })
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    }); 
  }
  
  const numberComplete = tasks.filter(t=> t.done).length;
  const numberTotal = tasks.length

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject,index) => index !== indexToRemove);
    });
  }

  function getMessage() {
    const percentage = numberComplete/numberTotal * 100;
    if (percentage === 0) {
      return 'Get One Done 💫';
    }
    if (percentage === 100) {
      return 'All Tasks Complete ❤️‍🔥';
    }
    return 'Keep going 🔒';
  }

  function renameTask(index,newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  return (
   <main>
    <h1>{numberComplete}/{numberTotal} complete</h1>
    <h2>{getMessage()}</h2>
    <TaskForm onAdd ={addTask}/>
    {tasks.map((task, index : number)=> (
      <Task {...task} 
        onRename={newName => renameTask(index,newName)}
        onTrash={() => removeTask(index)}
        onToggle={done => updateTaskDone(index, done)}/>
    ))}

   </main>
  );
}

export default App;
