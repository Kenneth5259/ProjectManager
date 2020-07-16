import React, {useState} from 'react';

import './create-new-category.css';

const CreateNewCategory = (props) => {
    const [catData, setCatData] = useState({title: '', color: ''});

    const nameChangeHandler = (e) => {
        let tempName = e.target.value;
        setCatData({title: tempName, color: catData.color});
    }

    const colorChangeHandler = (e) => {
        let tempColor = e.target.value;
        setCatData({title: catData.title, color: tempColor});
    }

    return(
        <div className='category__form' style={{backgroundColor: `${catData.color}`}}>
            <input className='category__input category__name' onChange={nameChangeHandler}></input><br/>
            <input className='category__input category__color'onChange={colorChangeHandler}></input><br/>
            <button className='category__button' onClick={() => props.addCat(catData)}>Submit New Category</button>
        </div>
    )
}

export default CreateNewCategory;