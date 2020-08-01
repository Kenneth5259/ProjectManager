import React, {useState} from 'react';

import './new-project-form.css';

const NewProjectForm = (props) => {
    const [formData, updateFormData] = useState({title: '', description: ''});

    const handleFormData = () => {
        props.submit(formData);
    }
    
    const handleTitleChange = (e) => {
        updateFormData({title: e.target.value, description: formData.description});
    }

    const handleDescriptionChange = (e) => {
        updateFormData({title: formData.title, description: e.target.value});
    }
    return(
    <div className='form__container'>
        <label className='form__input__label'>Project Title: </label><br/>
        <input className='form__input' type='text' name='title' onChange={handleTitleChange}></input><br/>
        <label className='form__input__label'>Project Description</label><br/>
        <input className='form__input' type='text' name='description' onChange={handleDescriptionChange}></input><br/>
        <button className='form__submit__button' onClick={handleFormData}>Submit</button>
    </div>
    )
}

export default  NewProjectForm;