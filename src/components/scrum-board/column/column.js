import React from 'react';
import './column.css';
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
            </div>
        </div>
    );
}

export default Column;