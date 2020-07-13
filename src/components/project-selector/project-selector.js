import React, {useState} from 'react';

import './project-selector.css';

const ProjectSelector = (props) => {
    const [visibility, setVisibilty] = useState(false);
    const [activeProj, setActiveProj] = useState(props.selected)

    let projectList = props.projectList.map(project => {
        return(
        <li className='project__secondary' onClick={() => {setActiveProj(project); setVisibilty(!visibility)}}>{project.title}</li>
        )
    }); 

    return(
        <div className='container'>
            <h1 className='project__primary' onClick={() => setVisibilty(!visibility)}>{activeProj.title}</h1>
            {visibility ? <ul className={'project__list'}>{projectList}</ul> : null}
        </div>
    ); 
}

export default ProjectSelector;