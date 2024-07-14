// components/RadioButton.js
import React from 'react';
import './RadioButton.css';

const RadioButton = ({text, value, state, setState}) => {
    const handleRadioChange = (event) => {
        setState(event.target.value)
    }

    return <label className={"radio"}>
        <input
            type="radio"
            value={value}
            checked={state === value}
            onChange={handleRadioChange}
        />
        <span className={"checkmark"}></span>
        <span className={"text"}>{text}</span>
    </label>;
};

export default RadioButton;
