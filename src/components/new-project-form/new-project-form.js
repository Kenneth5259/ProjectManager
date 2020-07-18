import React, {useState} from 'react';

import './new-project-form.css';

const NewProjectForm = (props) => {
    const [formData, updateFormData] = useState({title: '', columns:''});

    const handleFormData = () => {
        props.submit(formData);
    }
    
    const handleTitleChange = (e) => {
        updateFormData({title: e.target.value, columns: formData.columns});
    }

    const handleColumnChange = (e) => {
        updateFormData({title: formData.title, columns: e.target.value});
    }
    return(
    <div className='form__container'>
        <label className='form__input__label'>Project Title: </label><br/>
        <input className='form__input' type='text' name='title' onChange={handleTitleChange}></input><br/>
        <label className='form__input__label'>Progress Columns(Comma Separated)</label><br/>
        <input className='form__input' type='text' name='title' onChange={handleColumnChange}></input><br/>
        <button className='form__submit__button' onClick={handleFormData}>Submit</button>
    </div>
    )
}

export default  NewProjectForm;