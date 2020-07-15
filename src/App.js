import React, {Component} from 'react';
import Header from './components/header/header';
import Project from './components/project/project';

const testProjects = [
  {
    title: 'Test 1',
    _id: '0000001',
    columns: ['Not Started', 'In Progress', 'Done'],
    tasks: [{
      title: 'Develop Object Model', 
      description: 'Develop object model in compliance with requirement #83764',
      column:'Not Started',
      category: 'Compression Engine'
    },
    {
      title: 'CRUD Formatting', 
      description: 'Implement the CRUD formatting for phase 1 ingestion engine',
      column:'Not Started',
      category: 'Ingestion Engine'
    }],
    categories: [
      {
        title: 'Ingestion Engine',
        color: '#D4F4DD'
      },
      {
        title: 'Compression Engine',
        color: '#17BEBB'
      }
    ]

  },
  {
    title: 'Test 2',
    _id: '0000002',
    columns: ['Task Category Guide', 'Not Started', 'In Progress', 'Done']
  },
  {
    title: 'Test 3',
    _id: '0000003',
    columns: ['Task Category Guide', 'Not Started', 'In Progress', 'Done']
  },
  {
    title: 'Test 4',
    _id: '0000004',
    tasks: [{
      title: 'test', 
      description: 'testing a task',
      column:'Not Started'
    },
    {
      title: 'test 2', 
      description: 'testing a task',
      column:'Not Started',
    }],
    columns: ['Task Category Guide', 'Not Started', 'In Progress', 'Done']
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: testProjects,
      activeProject: testProjects[0]
    };
  }
  /*
  componentDidMount() {
    fetch('http://localhost:2500/projects')
    .then((results) => results.json())
    .then((projects) => {
      this.setState({
        projects: projects,
        activeProject: projects[0]
      });
    })*/
  addNewProjectHandler = (title) => {
    
    let tempProjects = this.state.projects;
    tempProjects.push({
      title: title,
      _id: Math.random()
    });
    this.setState({projects: tempProjects});
  }  

  updateActiveProjectHandler = (id) => {
    let projects = this.state.projects;
    console.log(projects);
    let active = projects.filter((project) => {
      return project._id === id;
    });
    if(active.length > 0) {
      this.setState({activeProject: active[0]});
    }
  }
  
  render() {
    return (
      <div>
        <div className='header'>
          <Header 
          selected={this.state.activeProject} 
          projectList={this.state.projects}
          addHandler={this.addNewProjectHandler.bind(this)}
          updateActiveHandler={this.updateActiveProjectHandler.bind(this)}/>
        </div>
        {
        <Project 
          key={this.state.activeProject._id}
          project={this.state.activeProject}
        />}

      </div>
      
    )
  }
}

export default App;