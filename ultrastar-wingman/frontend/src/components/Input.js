// components/Input.js

import React from 'react';
import './Input.css';
import {GiCancel} from "react-icons/gi"; // Importing the CSS for styling

const Input = ({type, placeholder, icon, searchTerm, setSearchTerm, onFocus}) => {
    const input = <input
        type={type}
        placeholder={placeholder}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onFocus={onFocus}
    />;

    // Combine the passed className with the default classes
    return <div className={"input-field"}>
        {/*TODO: scroll on focus does not work on mobile*/}
        <span className={"search"}>
            {icon}
        </span>
        {input}
        {searchTerm &&
            <span className={"cancel"} onClick={() => {
                setSearchTerm('');
            }}>
                <GiCancel/>
            </span>
        }
    </div>;
};

export default Input;
