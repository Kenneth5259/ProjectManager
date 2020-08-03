import React from 'react';
import EditButton from '../../edit-button/edit-button';

import './task.css';
import Axios from 'axios';

const Task = (props) => {
    const editFinished = (task) => {
        Axios.post('http://localhost:2500/api/projects/' + `${props.projectId}/update/task/${props.id}/edit`, {task: task})
        .then( () => {
            console.log('Axios Post Completed');
            props.forceRender({});
        });
    }
    const originalTaskInfo = {
        _id: props.id,
        title: props.title,
        description: props.description,
        category: props.category
    }
    return(
        <EditButton edit={false} editFinished={editFinished} originalInformation={originalTaskInfo}>
            <div 
            key={props.id} 
            draggable={props.draggable} 
            className='task' 
            onDragStart={(event) => props.onDragStart(event, props.title)}
            style={{backgroundColor: `${props.backgroundColor}`}}
            >
                
                <h1 className='task__title' identifier='title'>{props.title}</h1>
                <p className='task__description' identifier='description'>{props.description}</p>
                <div className='task__buttons'>
                    <button className='task__button task__button__comp' onClick={() => {props.completeTask(props.id)}}>Complete</button>
                    <button className='task__button task__button__del' onClick={()=> {props.deleteTask(props.id)}}>Delete</button>
                </div>
            </div>
        </EditButton>
    );
}

export default Task;