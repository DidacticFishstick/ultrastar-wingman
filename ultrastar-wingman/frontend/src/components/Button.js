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
    return <button onClick={() => {
        if(!disabled && onClick !== undefined) {
            onClick();
        }
    }} className={"button " + (disabled ? "disabled " : "") + (blue ? "blue " : "") + className} {...props}>{children}</button>;
};

export default Button;
