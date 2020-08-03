import React, {useState} from 'react';
import AddButton from '../../add-button/add-button';

import './create-new-category.css';

const CreateNewCategory = (props) => {
    const blankForm = {
        title: '',
        color: ''
    };
    const [catData, setCatData] = useState(blankForm);
    const [showForm, setShowForm] = useState(false);

    const plusClicked = () => {
        setShowForm(true);
    }

    const nameChangeHandler = (e) => {
        let tempName = e.target.value;
        setCatData({title: tempName, color: catData.color});
    }

    const colorChangeHandler = (e) => {
        let tempColor = e.target.value;
        setCatData({title: catData.title, color: tempColor});
    }

    const submitSafetyCheck = () => {
        if(catData.title.length > 0) {
            if(catData.color.length > 0) {
                props.addCat(catData);
                setCatData(blankForm);
                setShowForm(false);
            } else {
                alert('Category Color Field is Required');
            }
        } else {
            alert('Category Title Field is required');
        }
    }

    return(
        <AddButton showChild={showForm} setShow={plusClicked}>
            <div className='category__form' style={{backgroundColor: `${catData.color}`}}>
                <input className='category__input category__name' onChange={nameChangeHandler} placeholder='New Category Name'></input><br/>
                <input className='category__input category__color'onChange={colorChangeHandler} placeholder='New Color Code'></input><br/>
                <button className='category__button' onClick={submitSafetyCheck}>Submit New Category</button>
            </div>
        </AddButton>
        
    )
}

export default CreateNewCategory;