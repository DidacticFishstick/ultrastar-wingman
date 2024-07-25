// components/LoginForm.js

import React, {useState} from 'react';
import './LoginForm.css';
import {downloadFromUsdb, login} from "../helpers"; // Importing the CSS for styling

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        downloadFromUsdb("3860");

        login(username, password, () => {
            downloadFromUsdb("3860");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
