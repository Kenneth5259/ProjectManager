import React, {Component}from 'react';
import './project.css';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        tasks: [],
        columns: []
      }//each project has an array of columns, which contain an array of tasks, which each contain a title and description
    }

  componentDidMount() {
      fetch('http://localhost:2500/api/projects/'+this.props.id)
      .then((result) => result.json())
      .then((res) => {
          this.setState({
              title: res.title,
              tasks: res.tasks,
              columns: res.columns
          })
      })
  }
  onDragStart(event, title){
    console.log('dragstart on', title);
    event.dataTransfer.setData('title', title);
  }

  onDragOver(event){
    event.preventDefault();
  }

  onDrop(event, col) {
    console.log('Dropped on ', col)
    let title = event.dataTransfer.getData('title');

    let tasks = this.state.tasks.filter(task => {
      if(task.title === title) {
        task.column = col;
      }
      return task;
    });
    this.setState ({
      tasks: tasks
    });
  }

  render() {
    let tasks = {};
    if(this.state.tasks){
      this.state.tasks.map((task) => {
        if(tasks[task.column] === undefined) {
          tasks[task.column] = [];
        }
        tasks[task.column].push(
            <div key={task.id} draggable className='task' onDragStart={(event) => this.onDragStart(event, task.title)}>
                <h1 className='task__title'>{task.title}</h1>
                <p className='task__description'>{task.description}</p>
            </div>
        )
    });
    }
    const columns = this.state.columns ? this.state.columns.map( (column) => {
        return(
        <div className='column droppable' onDrop={(event) => this.onDrop(event, column)} onDragOver={(event)=> {this.onDragOver(event)}}>
        <h3 className='column__title' key={column}>{column}</h3>
            <div className='task_row'>
                {tasks[column]}
            </div>
        </div>)
    }) : null;

    return(
      <div className='project'>
        <h4 className='project__title'>{this.state.title}</h4>
        <div className='project__columns'>{columns}</div>
      </div>)
  }
}

export default Project;
