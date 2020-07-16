import React, {Component} from 'react';
import Header from './components/header/header';
import ScrumBoard from './components/scrum-board/scrum-board';
import NewProjectForm from './components/new-project-form/new-project-form';

const testProjects = [
  {
    title: 'Test 1',
    _id: '0000001',
    columns: ['Not Started', 'In Progress', 'Done'],
    tasks: [{
      id: Math.random(),
      title: 'Develop Object Model', 
      description: 'Develop object model in compliance with requirement #83764',
      column:'Not Started',
      category: 'Compression Engine'
    },
    {
      id: Math.random(),
      title: 'Test Document Object Model', 
      description: 'Test the Document Object Model',
      column:'Not Started',
      category: 'Compression Engine'
    },
    {
      id: Math.random(),
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
      projects: testProjects,
      activeProject: testProjects[0],
      scrumVisibility: true,
      formVisibility: false
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

  addNewProjectHandler = (ProjectInformation) => {
    if(ProjectInformation.title.length > 0){
      let tempColumns = ProjectInformation.columns;
      tempColumns = tempColumns.split(', ');
      tempColumns = tempColumns.filter((col) => {
        if(col.length > 0) {
          return col;
        }
      })
      tempColumns.unshift('Done');
      tempColumns.unshift('In Progress');
      tempColumns.unshift('Not Started');
      let tempProjects = this.state.projects;
      let tempProject = {
        title: ProjectInformation.title, 
        _id: Math.random(),
        columns: tempColumns,
        tasks: [],
        categories: []
      
      };
      tempProjects.push(tempProject);
      this.setState({
        projects: tempProjects,
        activeProject: tempProject
      });
    }
    this.formVisibilityHandler();
  
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
  formVisibilityHandler = () => {
    let newFormVisibility = !this.state.formVisibility;
    let newScrumVisibilty = !this.state.scrumVisibility;
    this.setState({
      formVisibility: newFormVisibility,
      scrumVisibility: newScrumVisibilty
    });
  }
  updateProjectInformation = (project) => {
    let tempProjects = this.state.projects.filter((proj) => {
      if(proj._id === project._id) {
        proj.tasks = project.tasks;
      }
      return proj;
    });
    this.setState({projects: tempProjects});
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
          updateActiveHandler={this.updateActiveProjectHandler.bind(this)}
          formVisibilityHandler={this.formVisibilityHandler.bind(this)}/>
        </div>
        {this.state.scrumVisibility? <ScrumBoard 
          key={this.state.activeProject.tasks}
          project={this.state.activeProject}
          updateProjects={this.updateProjectInformation.bind(this)}
        />: null}
        {this.state.formVisibility ? <NewProjectForm submit={this.addNewProjectHandler.bind(this)}/> : null}
        

      </div>
      
    )
  }
}

export default App;