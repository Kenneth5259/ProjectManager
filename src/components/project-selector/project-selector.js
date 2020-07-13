import React, {useState} from 'react';

import './project-selector.css';

import logo from '../../logo.png';

const ProjectSelector = (props) => {
    let initValue = {title: 'Not Loaded'};
    if(props.selected) {
        initValue = props.selected;
    }
    const [visibility, setVisibilty] = useState(false);
    const [activeProj, setActiveProj] = useState(props.selected)

    let projectList = props.projectList.map(project => {
        return(
        <li className='project__secondary' onClick={() => {setActiveProj(project); setVisibilty(!visibility)}}>{project.title}</li>
        )
    }); 

    return(
        <div className='header'>
            <div className='selector'>
                <img className='logo' src={logo} alt='oops'/>
                <h1 className='project__primary' onClick={() => setVisibilty(!visibility)}>{activeProj.title}</h1>
                {visibility ? <ul className={'project__list'}>{projectList}</ul> : null}
            </div>  
        </div>
        
    ); 
}

export default ProjectSelector;