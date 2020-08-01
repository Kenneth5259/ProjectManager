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
            <div className='task__buttons'>
                <button className='task__button task__button__comp' onClick={() => {props.completeTask(props.id)}}>Complete</button>
                <button className='task__button task__button__del' onClick={()=> {props.deleteTask(props.id)}}>Delete</button>
            </div>
        </div>
    );
}

export default Task;