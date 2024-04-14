// components/Button.js
import React from 'react';
import './Button.css';

const Button = ({text, onClick}) => {
    return <span onClick={onClick} className={"button"} tabIndex={0}>{text}</span>;
};

export default Button;
