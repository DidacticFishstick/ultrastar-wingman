// components/Button.js
import React from 'react';
import './Button.css';

const Button = ({
                    children,
                    className,
                    onClick,
                    blue,
                    props
                }) => {
    return <span onClick={onClick} className={"button " + (blue ? "blue " : "") + className} tabIndex={0}  {...props}>{children}</span>;
};

export default Button;
