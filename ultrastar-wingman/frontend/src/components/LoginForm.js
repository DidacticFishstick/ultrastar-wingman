// components/LoginForm.js

import React, {useState} from 'react';
import './LoginForm.css';
import {login, register} from "../helpers";
import Input from "./Input";
import {FaLock, FaUser} from "react-icons/fa";
import Button from "./Button";

const LoginForm = ({
                       setUser
                   }) => {
    const [registerMode, setRegisterMode] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    // TODO: same checks for temporary users
    let errorText = null;
    if (registerMode) {
        if (username.length > 0 && !/^[A-Za-z0-9_ -]+$/.test(username)) {
            errorText = <p className={"error"}>Username must contain only letters, digits, underscores, or dashes.</p>;
        } else if (username.length > 32) {
            errorText = <p className={"error"}>Username must not exceed 32 characters.</p>;
        } else if (password.length && (password.length < 8)) {
            errorText = <p className={"error"}>The password has to be at least 8 characters long.</p>;
        } else if (password !== password2) {
            errorText = <p className={"error"}>The passwords do not match.</p>;
        }
    }

    const handleSubmit = async (e) => {
        if (e !== undefined) {
            e.preventDefault();
        }

        if (username === '' || password === '') {
            return;
        }

        if (errorText !== null) {
            return;
        }

        if (registerMode) {
            register(username, password, data => setUser(data));
        } else {
            login(username, password, data => setUser(data));
        }
    };

    return <div className={"login-form"}>
        {!registerMode &&
            <h1>Log In</h1>
        }
        {registerMode &&
            <div>
                <h1>Register</h1>
                <p>An account will give you access to features like favorites and enable the admin to give you more permissions.</p>
                <p>You will also ensure that nobody else will use your name and screw with your scores.</p>
            </div>
        }

        <form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Username"
                icon={<FaUser/>}
                value={username}
                setValue={setUsername}
                onEnter={handleSubmit}
                noClear={true}
            />
            <Input
                type="password"
                placeholder="Password"
                icon={<FaLock/>}
                value={password}
                setValue={setPassword}
                onEnter={handleSubmit}
                noClear={true}
            />
            {registerMode &&
                <Input
                    type="password"
                    placeholder="Password"
                    icon={<FaLock/>}
                    value={password2}
                    setValue={setPassword2}
                    onEnter={handleSubmit}
                    noClear={true}
                />
            }

            {errorText && errorText}

            {!registerMode &&
                <Button type={"submit"} disabled={username === '' || password === '' || errorText !== null}>Log In</Button>
            }
            {registerMode &&
                <Button type={"submit"} disabled={username === '' || password === '' || errorText !== null}>Register</Button>
            }
        </form>
        {!registerMode &&
            <p className={"register-mode"}>New to Ultrastar Wingman? <span onClick={() => setRegisterMode(true)}>Create Account</span></p>
        }
        {registerMode &&
            <p className={"register-mode"}>Already have an account? <span onClick={() => setRegisterMode(false)}>Log In</span></p>
        }
    </div>;
};

export default LoginForm;
