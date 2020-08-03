import React, {useState} from 'react';
import AddButton from '../../add-button/add-button';

import './create-new-task.css';

const CreateNewTask = (props) => {
    const blankForm = {
        title: '', 
        description: '',
        backlogged: false,
        category: '',
        column: props.column
    };
    const [taskData, setTaskData] = useState(blankForm);
    const [showForm, setShowForm] = useState(false);

    const plusClicked = () => {
        setShowForm(true);
    }

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
                    setShowForm(false);
                    setTaskData(blankForm);
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
        <AddButton showChild={showForm} setShow={plusClicked}>
            <div className='task task__form'>
                <input className='task__input task__name' onChange={nameChangeHandler} placeholder='New Task Name'></input><br/>
                <textarea className='task__input task__desc'onChange={descriptionChangeHandler} placeholder='New Task Description'></textarea><br/>
                <input className='task__input task__category' onChange={categoryChangeHandler} placeholder='New Task Category'></input><br/>
                <button className='task__button' onClick={submitSafetyCheck}>Submit New Task</button>
            </div>
        </AddButton>
        
    )
}

export default CreateNewTask;