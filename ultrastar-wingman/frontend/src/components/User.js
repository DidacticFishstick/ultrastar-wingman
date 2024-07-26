// components/User.js

import React, {useRef, useState} from 'react';
import './User.css';
import LoginForm from "./LoginForm";
import {logout, uploadAvatar, useUser} from "../helpers";
import Button from "./Button"; // Importing the CSS for styling

const User = () => {
    const [user, setUser] = useUser();

    const fileInputRef = useRef(null);
    const avatarRef = useRef(null);

    if (!user) {
        return <div className={"user-page"}>
            <LoginForm
                setUser={setUser}
            />
        </div>;
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        console.log(file);

        if (!file) {
            return;
        }

        uploadAvatar(user.id, file, data => {
            avatarRef.current.style.backgroundImage = `url(/api/players/registered/${user.id}/avatar?t=${new Date().getTime()}.png)`
        });
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return <div className={"user-page"}>
        <div className={"profile"}>
            <input
                ref={fileInputRef}
                type="file"
                id="fileInput"
                accept="image/*"
                style={{display: 'none'}}
                onChange={handleFileChange}
            />
            <span ref={avatarRef} className={"avatar"} onClick={handleButtonClick} style={{backgroundImage: `url(/api/players/registered/${user.id}/avatar)`}}></span>

            <label>{user.email}</label>
            <Button onClick={() => logout(() => setUser(null))}>Log Out</Button>
        </div>
    </div>;
};

export default User;
