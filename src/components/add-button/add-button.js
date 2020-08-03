import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

import './add-button.css';

const AddButton = (props) => {
    return (
            props.showChild ? <div className='child'>{props.children}</div> :
            <FontAwesomeIcon 
                className='add__button'
                color='#0E7C7B'
                size='2x' 
                icon={faPlusCircle} 
                onClick={() => {props.setShow()}}
            />
    );
}
export default AddButton;