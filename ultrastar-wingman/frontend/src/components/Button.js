// components/Button.js
import React from 'react';
import './Button.css';

const Button = ({
                    children,
                    className,
                    onClick,
                    disabled,
                    blue,
                    props
                }) => {
    return <span onClick={() => {
        if(!disabled) {
            onClick();
        }
    }} className={"button " + (disabled ? "disabled " : "") + (blue ? "blue " : "") + className} tabIndex={0}  {...props}>{children}</span>;
};

export default Button;
