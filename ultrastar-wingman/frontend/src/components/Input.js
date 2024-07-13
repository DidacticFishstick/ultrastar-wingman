// components/Input.js

import React, { useRef, useEffect } from 'react';
import './Input.css';
import {GiCancel} from "react-icons/gi"; // Importing the CSS for styling

const Input = ({type, placeholder, icon, searchTerm, setSearchTerm, onFocus, onEnter}) => {
    const inputRef = useRef(null);

    const input = <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onFocus={onFocus}
        onKeyDown={(event) => {
            if (event.key === 'Enter') {
                onEnter(event);
                inputRef.current.blur();
            }
        }}
    />;

    return <div className={"input-field"}>
        {/*TODO: scroll on focus does not work on mobile*/}
        <span className={"search"}>
            {icon}
        </span>
        {input}
        {searchTerm &&
            <span className={"cancel"} onClick={() => {
                setSearchTerm('');
                inputRef.current.focus()
            }}>
                <GiCancel/>
            </span>
        }
    </div>;
};

export default Input;
