import React from 'react';
import './column.css';

import CreateNewTask from '../create-new-task/create-new-task';

const Column = (props) => {
    return(
        <div 
            className='column droppable' 
            onDrop={(event) => props.onDrop(event, props.column)} 
            onDragOver={(event)=> {props.onDragOver(event)}}
        >
        <h3 className='column__title' key={props.column}>{props.column}</h3>
            <div className='task_row'>
                {props.tasksHolder[props.column]}
                <CreateNewTask newTask={props.newTask} column={props.column}/>
            </div>
            
        </div>
    );
}

export default Column;