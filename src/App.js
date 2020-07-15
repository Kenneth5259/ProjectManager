import React, {Component} from 'react';
import Header from './components/header/header';
import ScrumBoard from './components/scrum-board/scrum-board';

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
      title: 'Test Document Object Model', 
      description: 'Test the Document Object Model',
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

  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      activeProject: {}
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
    let tempProject = {
      title: title, 
      _id: Math.random(),
      columns: [],
      tasks: [],
      categories: []
    
    };
    tempProjects.push(tempProject);
    this.setState({
      projects: tempProjects,
      activeProject: tempProject
    });
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
          key={this.state.activeProject.title}
          selected={this.state.activeProject.title ? this.state.activeProject : {title: 'No Project Found'}} 
          projectList={this.state.projects}
          addHandler={this.addNewProjectHandler.bind(this)}
          updateActiveHandler={this.updateActiveProjectHandler.bind(this)}/>
        </div>
        {
        <ScrumBoard 
          key={this.state.activeProject._id}
          project={this.state.activeProject}
        />}

      </div>
      
    )
  }
}

export default App;