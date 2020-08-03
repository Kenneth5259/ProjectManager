import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-regular-svg-icons';

import './edit-button.css';

const EditButton = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [componentInfo, setComponentInfo] = useState(props.originalInformation);

    const onChangeHandler = (e) => {
        let componentInfoTemp = {...componentInfo};
        let identifier = e.target.dataset.identifier;
        componentInfoTemp[identifier] = e.target.value;
        setComponentInfo(componentInfoTemp);
    }



    const editToggle = () => {
        if(editMode) {
            console.log(componentInfo);
            props.editFinished(componentInfo);
        }
        setEditMode(!editMode);
    }
    let formView = [];
    props.children.props.children.map((component) => {
        if(component.type !== 'div') {
            formView.push(
                <textarea 
                    placeholder={component.props.children} 
                    className={component.props.className} 
                    data-identifier={component.props.identifier}
                    onChange={onChangeHandler}>
                    
                </textarea>
            )
        }
        return component;
    });
    let formViewHolder = (
        <div className={'input__mode '+ props.children.props.className} style={props.children.props.style}>
            {formView}
        </div>
    );


    return(
        <div className='edit__button'>
            <FontAwesomeIcon className='edit__button__icon' icon={faEdit} size='2x' onClick={editToggle}/>
            {!editMode ? props.children : formViewHolder}
        </div>
    )
}

export default EditButton;