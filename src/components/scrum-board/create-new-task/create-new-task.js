import React, {useState} from 'react';

import './create-new-task.css';

const CreateNewTask = (props) => {
    const [taskData, setTaskData] = useState({
        title: '', 
        description: '',
        category: '',
        column: props.column
    });

    const nameChangeHandler = (e) => {
        let tempName = e.target.value;
        setTaskData({
            title: tempName, 
            category: taskData.category, 
            description: taskData.description, 
            column: taskData.column
        });
    }

    const descriptionChangeHandler = (e) => {
        let tempDesc = e.target.value;
        setTaskData({
            title: taskData.title, 
            category: taskData.category, 
            description: tempDesc,
            column: taskData.column
        });
    }

    const categoryChangeHandler = (e) => {
        let tempCat = e.target.value;
        setTaskData({
            title: taskData.title, 
            category: tempCat, 
            description: taskData.description,
            column: taskData.column
        });
    }

    return(
        <div className='task__form'>
            <input className='task__input task__name' onChange={nameChangeHandler}></input><br/>
            <input className='task__input task__desc'onChange={descriptionChangeHandler}></input><br/>
            <input className='task__input task__category' onChange={categoryChangeHandler}></input><br/>
            <button className='task__button' onClick={() => props.newTask(taskData)}>Submit New Task</button>
        </div>
    )
}

export default CreateNewTask;