// components/User.js

import React from 'react';
import './User.css';
import LoginForm from "./LoginForm";
import {logout, useUser} from "../helpers";
import Button from "./Button"; // Importing the CSS for styling

const User = () => {
    const [user, setUser] = useUser();

    if (!user) {
        return <div className={"user-page"}>
            <LoginForm
                setUser={setUser}
            />
        </div>;
    }

    return <div className={"user-page"}>
        <h1>{`Hello ${user.email}`}</h1>
        <Button onClick={() => logout(() => setUser(null))}>Log Out</Button>
    </div>;
};

export default User;
