import React, {useState} from 'react';

import './create-new-task.css';

const CreateNewTask = (props) => {
    const [taskData, setTaskData] = useState({
        title: '', 
        description: '',
        backlogged: false,
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

    const submitSafetyCheck = () => {
        if(taskData.title.length > 0){
            if(taskData.description.length > 0) {
                if(taskData.category.length > 0) {
                    props.newTask(taskData);
                } else {
                    alert('Category is required for any new task');
                }
            } else {
                alert('Description is required for any new task');
            }
        } else {
            alert('Title is required for any new task');
        }
        
    }

    return(
        <div className='task task__form'>
            <input className='task__input task__name' onChange={nameChangeHandler} placeholder='New Task Name'></input><br/>
            <textarea className='task__input task__desc'onChange={descriptionChangeHandler} placeholder='New Task Description'></textarea><br/>
            <input className='task__input task__category' onChange={categoryChangeHandler} placeholder='New Task Category'></input><br/>
            <button className='task__button' onClick={submitSafetyCheck}>Submit New Task</button>
        </div>
    )
}

export default CreateNewTask;