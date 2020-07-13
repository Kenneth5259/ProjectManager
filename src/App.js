import React, {Component} from 'react';

import Project from './components/project/project';
import ProjectSelector from './components/project-selector/project-selector';

const testProjects = [
  {
    title: 'Test 1',
    _id: '0000001'
  },
  {
    title: 'Test 2',
    _id: '0000002'
  }
];

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: testProjects,
      activeProject: testProjects[0]
    }
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
    
  
  render() {
    return (
      <div>
        <ProjectSelector selected={this.state.activeProject} projectList={this.state.projects}/>
        <Project 
          id={this.state.activeProject}
        /> 
      </div>
      
    )
  }
}

export default App;