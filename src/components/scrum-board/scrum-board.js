import React, {useState}from 'react';
import TaskHolder from './task/task-holder';
import Column from './column/column.js';
import './scrum-board.css';

const ScrumBoard = (props) => {
  const [tasks, setTasks] = useState(props.project.tasks);
  const [columns, setColumns] = useState(props.project.columns);
  const [categories, setCats] = useState(props.project.categories);
  
  const onDragStart = (event, title) => {
    console.log('dragstart on', title);
    event.dataTransfer.setData('title', title);
  }

  const onDragOver = (event) => {
    event.preventDefault();
  }

  const onDrop = (event, col) => {
    console.log('Dropped on ', col)
    let title = event.dataTransfer.getData('title');
    let tempTasks = tasks.filter(task => {
      if(task.title === title) {
        task.column = col;
      }
      return task;
    });
    setTasks(tempTasks);
  }
  let tasksHolder = {}
  if(tasks) {
    tasksHolder = TaskHolder(tasks, categories, onDragStart);
  }

  const columnsHolder = columns ? columns.map( (column) => {
      return(
        <Column 
          onDrop={onDrop}
          onDragOver={onDragOver}
          tasksHolder={tasksHolder}
          column={column}
        />
      )
  }) : null;

  const categoryHolder = categories ? categories.map( (category) => {
   return(
   <div className='task' style={{backgroundColor: `${category.color}`}}>
      <h1 className='task__title'>{category.title}</h1>
    </div>)
  }): null;

  columnsHolder.unshift((
    <div 
      className='column'
    >
    <h3 className='column__title' key='-1'>Task Category Guide</h3>
        <div className='task_row'>
            {categoryHolder}
        </div>
    </div>))


  return(
    <div className='project'>
      <div className='project__columns'>{columnsHolder}</div>
    </div>)
}

export default ScrumBoard;
