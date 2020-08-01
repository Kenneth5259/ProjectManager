import React, {useState}from 'react';
import TaskHolder from './task/task-holder';
import CategoryHolder from './category-holder';
import CreateNewCategory from './create-new-category/create-new-category';
import Column from './column/column.js';
import './scrum-board.css';

const ScrumBoard = (props) => {
  // State Management
  const [project, setProj] = useState(props.project);
  const [tasks, setTasks] = useState(props.project.tasks);
  const [columns, setColumns] = useState(props.project.columns);
  const [categories, setCats] = useState(props.project.categories);
  
  //Parent Feedback

  const pushUpdatedProject = () => {
    let tempProject = {...project};
    tempProject.tasks = tasks;
    tempProject.columns = columns;
    tempProject.categories = categories;
    setProj(tempProject);
    props.updateProjects(tempProject);
  }

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
    pushUpdatedProject();
  }

  const completeTask = (id) => {
    let tempTasks = [...tasks];
    tempTasks = tempTasks.filter((task) => {
      if(task._id === id) {
        task.backlogged = true;
      }
      return task;
    });
    setTasks(tempTasks);
    pushUpdatedProject();
  }

  const deleteTask = (id) => {
    let tempTasks = [...tasks];
    setTasks(tempTasks.filter((task) => {
      if(task._id !== id) {
        return task;
      }
    }));
    pushUpdatedProject();
  }

  const pushNewTask = (task) => {
    let tempTask = {
      title: task.title,
      description: task.description,
      backlogged: false,
      category: task.category,
      column: task.column
    }
    let tempTasks = tasks ? tasks : [];
    tempTasks.push(tempTask);
    setTasks(tempTasks);
    pushUpdatedProject();
  }

  const addNewCategory = (cat) => {
    let tempCat = categories ? categories : [];
    tempCat.push({title: cat.title, color: cat.color});
    setCats(tempCat);
    pushUpdatedProject();
  }

  const columnsHolder = columns ? columns.map( (column) => {
      return(
        <Column 
          key={column}
          onDrop={onDrop}
          onDragOver={onDragOver}
          tasksHolder={TaskHolder(tasks, categories, onDragStart, completeTask, deleteTask)}
          column={column}
          newTask={pushNewTask}
        />
      )
  }) : null;
  const categoryHolder = categories ? CategoryHolder(categories) : null;
  if(columnsHolder) {
    columnsHolder.unshift((
      <div 
        className='column'
        key='-1'
      >
      <h3 className='column__title' >Task Category Guide</h3>
          <div className='task_row'>
              {categoryHolder}
              <CreateNewCategory addCat={addNewCategory}/>
          </div>
      </div>));
  } 


  return(
    <div className='project'>
      <div className='project__columns'>{columnsHolder}</div>
    </div>)
}

export default ScrumBoard;
