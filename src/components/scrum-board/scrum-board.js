import React, {useState}from 'react';
import TaskHolder from './task/task-holder';
import CategoryHolder from './category-holder';
import CreateNewCategory from './create-new-category/create-new-category';
import Column from './column/column.js';
import './scrum-board.css';
import Axios from 'axios';

const ScrumBoard = (props) => {
  // State Management
  const [project, setProj] = useState(props.project);
  console.log(project);
  const [tasks, setTasks] = useState(props.project.tasks);
  const [columns, setColumns] = useState(props.project.columns);
  const [categories, setCats] = useState(props.project.categories);
  const [filter, setFilter] = useState('*');

  const onCategoryClick = (cat) => {
    if(filter === cat.title) {
      setFilter('*');
    } else {
      setFilter(cat.title);
    }
  }
  
  //Parent Feedback

  const pushUpdatedProject = () => {
    let tempProject = {...project};
    tempProject.tasks = [...tasks];
    tempProject.columns = [...columns];
    tempProject.categories = [...categories];
    setProj(tempProject);
    console.log(tempProject);
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
    let tempTasks = [...tasks];
    let taskId;
    tempTasks = tempTasks.filter(task => {
      if(task.title === title) {
        task.column = col;
        taskId = task._id;
      }
      return task;
    });
    Axios.post(props.api + `${project._id}/update/task/${taskId}/column/`, {column: col})
    .then(() => {
      setTasks(tempTasks);
      pushUpdatedProject();
    });
    
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
    Axios.post(props.api + `${project._id}/delete/task/${id}`)
    .then( () => 
        {let tempTasks = [...tasks];
        setTasks(tempTasks.filter((task) => {
          if(task._id !== id) {
            return task;
          }
        }));
        pushUpdatedProject();}
    );
  }

  const pushNewTask = (task) => {
    let tempTask = {
      title: task.title,
      description: task.description,
      backlogged: false,
      category: task.category,
      column: task.column
    }
    Axios.post(props.api + `${project._id}/create/task/`, {task: tempTask}).then((temp) => {
      let tempTasks = [...tasks];
      tempTasks.push(tempTask);
      setTasks(tempTasks);
      pushUpdatedProject();
    });
  }

  const addNewCategory = (cat) => {
    let tempCat = [...categories];
    Axios.post(props.api + `${project._id}/create/category/`, {category: cat})
    .then((temp) => {
      tempCat.push({title: cat.title, color: cat.color});
      setCats(tempCat);
      pushUpdatedProject();
    });
  }

  const columnsHolder = columns ? columns.map( (column) => {
      return(
        <Column 
          key={column}
          onDrop={onDrop}
          onDragOver={onDragOver}
          tasksHolder={TaskHolder(tasks, categories, onDragStart, completeTask, deleteTask, filter)}
          column={column}
          newTask={pushNewTask}
        />
      )
  }) : null;
  const categoryHolder = categories ? CategoryHolder(categories, onCategoryClick) : null;
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
