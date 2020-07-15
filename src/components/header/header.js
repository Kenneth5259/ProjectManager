import React, {useState} from 'react';

import NewProjectForm from '../new-project-form/new-project-form';

import './header.css';

import logo from '../../logo.png';

const Header = (props) => {
    //State Initialization and Hooks
    let initValue = {title: 'Not Loaded'};
    if(props.selected) {
        initValue = props.selected;
    }
    const [visibility, setVisibilty] = useState(false);
    const [activeProj, setActiveProj] = useState(props.selected);
    const [showForm, toggleForm] = useState(false);

    //Project Mapping
    const listItemClicked = (project) => {
        setActiveProj(project); 
        setVisibilty(!visibility); 
        toggleForm(false);
        props.updateActiveHandler(project._id);
    }

    let projectList = props.projectList.map(project => {
        return(
        <li key={project._id} 
            className='project__secondary' 
            onClick={() => {listItemClicked(project)}
            }>{project.title}</li>
        )
    }); 

    //Project Form Handler

    let handleFormSubmit = (data) => {
        props.addHandler(data);
        toggleForm(!showForm);
    }
    

    //New Project Button
    projectList.push(<li key='-1'className='project__secondary' onClick={() => {toggleForm(!showForm); setVisibilty(!visibility);}}>Add New Project</li>)
    return(
        <div className='header'>
            <div className='selector'>
                <img className='logo' src={logo} alt='oops'/>
                <h1 className='project__primary' onClick={() => setVisibilty(!visibility)}>{activeProj.title}</h1>
                {visibility ? 
                    <ul className={'project__list'}>{projectList}</ul> : 
                null}
                {showForm ? 
                    <NewProjectForm submit={handleFormSubmit.bind(this)}/> : 
                null}
            </div>  
        </div>
        
    ); 
}

export default Header;