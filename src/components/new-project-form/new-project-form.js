import React, {useState} from 'react';

const NewProjectForm = (props) => {
    const [formData, updateFormData] = useState({title: ''});

    const handleFormData = () => {
        console.log(formData);
        props.submit(formData.title);
    }
    
    const handleChange = (e) => {
        updateFormData({title: e.target.value});
    }
    return(
    <div>
        <label>Project Title: </label><br/>
        <input type='text' name='title' onChange={handleChange}></input><br/>
        <button onClick={handleFormData}>Submit</button>
    </div>
    )
}

export default  NewProjectForm;