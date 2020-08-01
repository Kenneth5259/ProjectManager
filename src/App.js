import React, {Component} from 'react';
import Header from './components/header/header';
import ScrumBoard from './components/scrum-board/scrum-board';
import NewProjectForm from './components/new-project-form/new-project-form';

import Axios from 'axios';

const projectsApi = 'http://localhost:2500/api/projects/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      activeProject: {},
      scrumVisibility: true,
      formVisibility: false
    };
  }
  
  componentDidMount() {
    Axios.get(projectsApi)
      .then((results) => {
          if(results.data.project.length > 0){
            this.setState({
              projects: results.data.project,
              activeProject: results.data.project[0]
            })
          }
      }
    )
  }

  addNewProjectHandler = (ProjectInformation) => {
    if(ProjectInformation.title.length > 0){
      let tempColumns = [];
      tempColumns.unshift('Done');
      tempColumns.unshift('In Progress');
      tempColumns.unshift('Not Started');
      let tempProjects = this.state.projects ? this.state.projects : [];
      let tempProject = {
        title: ProjectInformation.title,
        description: ProjectInformation.description,
        columns: tempColumns,
        tasks: [],
        categories: []
      
      };
      tempProjects.push(tempProject);

      Axios.post(projectsApi + 'create/', {project: tempProject})
        .then((response) => {
          let received = response.data;
          this.setState({
            projects: tempProjects,
            activeProject: received.project,
            formVisibility: false,
            scrumVisibility: true
          })
        });
    }
  
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

  formVisibilityHandler = (value) => {
    this.setState({
      formVisibility: value,
    });
  }

  scrumVisibilityHandler = (value) => {
    this.setState({
      scrumVisibility: value
    });
  }

  updateProjectInformation = (project) => {
    Axios.post(projectsApi + 'update/' + project._id, {project: project})
        .then((response) => {
          let receivedProject = response.data.project;
          let tempProjects = this.state.projects.filter((proj) => {
            if(proj._id === receivedProject._id) {
              // proj.tasks = project.tasks; //updates project tasks
              proj = receivedProject;
            }
            return proj;
          });
          this.setState({projects: tempProjects});
    });
  }

  render() {
    console.log(this.state.activeProject);
    return (
      <div>
        <div className='header'>
          <Header 
          key={this.state.activeProject.title}
          selected={this.state.activeProject.title ? this.state.activeProject : {title: 'No Project Found'}} 
          projectList={this.state.projects}
          addHandler={this.addNewProjectHandler.bind(this)}
          updateActiveHandler={this.updateActiveProjectHandler.bind(this)}
          formVisibilityHandler={this.formVisibilityHandler.bind(this)}
          scrumVisibilityHandler={this.scrumVisibilityHandler.bind(this)}/>
        </div>
        {this.state.scrumVisibility? <ScrumBoard 
          key={this.state.activeProject._id}
          project={this.state.activeProject}
          updateProjects={this.updateProjectInformation.bind(this)}
        />: null}
        {this.state.formVisibility ? <NewProjectForm submit={this.addNewProjectHandler.bind(this)}/> : null}
      </div>
      
    )
  }
}

export default App;