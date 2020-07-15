import React from 'react';

import './task.css';

const Task = (props) => {
    return(
        <div 
        key={props.id} 
        draggable={props.draggable} 
        className='task' 
        onDragStart={(event) => props.onDragStart(event, props.title)}
        style={{backgroundColor: `${props.backgroundColor}`}}
        >
            <h1 className='task__title'>{props.title}</h1>
            <p className='task__description'>{props.description}</p>
        </div>
    );
}

export default Task;