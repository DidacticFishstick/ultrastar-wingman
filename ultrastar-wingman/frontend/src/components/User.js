// components/User.js

import React, {useRef, useState} from 'react';
import './User.css';
import LoginForm from "./LoginForm";
import {logout, uploadAvatar, usePermissions, useUser} from "../helpers";
import Button from "./Button";
import Permissions from "./Permissions"; // Importing the CSS for styling

const User = () => {
    const [user, setUser] = useUser();
    const [permissions, setPermissions] = usePermissions()

    const fileInputRef = useRef(null);
    const avatarRef = useRef(null);

    let userAccessLevel = "";
    if (user !== null) {
        userAccessLevel = permissions.access_levels
            .filter(item => item.value <= user.access_level)
            .reduce((max, item) => (item.value > max.value ? item : max), {value: -Infinity}).title;
    }

    if (!user) {
        return <div className={"user-page"}>
            <LoginForm
                setUser={setUser}
            />
        </div>;
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

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

    console.log(permissions);

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
            <label className={"role"}>{userAccessLevel}</label>
            <Button onClick={() => logout(() => setUser(null))}>Log Out</Button>
        </div>

        {user.access_level >= permissions.permissions["permissions.edit"].min_access_level &&
            <Permissions
                permissions={permissions}
                setPermissions={setPermissions}
                accessLevels={permissions.access_levels}
            />
        }
    </div>;
};

export default User;
