import React, {useState}from 'react';
import TaskHolder from './task/task-holder';
import CategoryHolder from './category-holder';
import Column from './column/column.js';
import './scrum-board.css';

const ScrumBoard = (props) => {
  // State Management
  const [tasks, setTasks] = useState(props.project.tasks);
  const [columns, setColumns] = useState(props.project.columns);
  const [categories, setCats] = useState(props.project.categories);
  
  // Drag and Drop Handlers
  const onDragStart = (event, title) => {
    event.dataTransfer.setData('title', title);
  }

  const onDragOver = (event) => {
    event.preventDefault();
  }

  const onDrop = (event, col) => {
    let title = event.dataTransfer.getData('title');
    let tempTasks = tasks.filter(task => {
      if(task.title === title) {
        task.column = col;
      }
      return task;
    });
    setTasks(tempTasks);
  }

  const columnsHolder = columns ? columns.map( (column) => {
      return(
        <Column 
          onDrop={onDrop}
          onDragOver={onDragOver}
          tasksHolder={TaskHolder(tasks, categories, onDragStart)}
          column={column}
        />
      )
  }) : null;
  const categoryHolder = categories ? CategoryHolder(categories) : null;

  if(columnsHolder) {
    columnsHolder.unshift((
      <div 
        className='column'
      >
      <h3 className='column__title' key='-1'>Task Category Guide</h3>
          <div className='task_row'>
              {categoryHolder}
          </div>
      </div>));
  } 


  return(
    <div className='project'>
      <div className='project__columns'>{columnsHolder}</div>
    </div>)
}

export default ScrumBoard;
