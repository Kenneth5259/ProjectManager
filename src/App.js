import React, {Component} from 'react';
import Project from './components/project/project';
import Header from './components/header/header';
import { findAllByTitle } from '@testing-library/react';

const testProjects = [
  {
    title: 'Test 1',
    _id: '0000001'
  },
  {
    title: 'Test 2',
    _id: '0000002'
  },
  {
    title: 'Test 3',
    _id: '0000003'
  },
  {
    title: 'Test 4',
    _id: '0000004'
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: testProjects,
      activeProject: testProjects[0]
    };

    console.log(this.state.projects);
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
  
  render() {
    return (
      <div>
        <div className='header'>
          <Header 
          selected={this.state.activeProject} 
          projectList={this.state.projects}
          addHandler={this.addNewProjectHandler.bind(this)}/>
        </div>
        {/*
        <Project 
          id={this.state.activeProject}
        /> */}

      </div>
      
    )
  }
}

export default App;