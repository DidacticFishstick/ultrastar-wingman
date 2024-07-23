// components/Input.js

import React, {useRef, useEffect} from 'react';
import './Input.css';
import {GiCancel} from "react-icons/gi"; // Importing the CSS for styling

const Input = ({
                   type,
                   placeholder,
                   icon,
                   value,
                   setValue,
                   onFocus,
                   onEnter,
                   className
               }) => {
    const inputRef = useRef(null);

    const input = <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={onFocus}
        onKeyDown={(event) => {
            if (event.key === 'Enter') {
                onEnter(event);
                inputRef.current.blur();
            }
        }}
    />;

    return <div className={"input-field " + className}>
        {/*TODO: scroll on focus does not work on mobile*/}
        <span className={"search"}>
            {icon}
        </span>
        {input}
        {value &&
            <span className={"cancel"} onClick={() => {
                setValue('');
                inputRef.current.focus()
            }}>
                <GiCancel/>
            </span>
        }
    </div>;
};

export default Input;
