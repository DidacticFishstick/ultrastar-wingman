// components/RadioButton.js
import React from 'react';
import './RadioButton.css';

const RadioButton = ({
                         text,
                         value,
                         state,
                         setState,
                         disabled
                     }) => {
    const handleRadioChange = (event) => {
        setState(event.target.value)
    }

    return <label className={"radio" + (disabled ? " disabled" : "")}>
        <input
            type="radio"
            value={value}
            checked={state === value}
            onChange={handleRadioChange}
            disabled={disabled === true}
        />
        <span className={"checkmark"}></span>
        <span className={"text"}>{text}</span>
    </label>;
};

export default RadioButton;
