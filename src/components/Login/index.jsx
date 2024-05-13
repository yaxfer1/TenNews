import React, { useState } from "react";
import {useLocation} from "wouter"
import useUser from '../../hooks/useUser.jsx'
import { useEffect } from "react";
import './index.css'

export default function Login({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [, navigate] = useLocation()
    const {isLoginLoading, hasLoginError, login, isLogged} = useUser()

    useEffect(() => {
        if (isLogged) {
            navigate('/home')
            onLogin && onLogin()
        }
    }, [isLogged, navigate, onLogin])

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ username, password })
    };

    return (
        <>
            {isLoginLoading && <strong className="loading"> Checking credentials... </strong>}
            {!isLoginLoading &&
                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        <input
                            id="username"
                            type="text"
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </label>

                    <label htmlFor="password">
                        <input
                            id="password"
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </label>

                    <button className='btn' type="submit"><strong>Login</strong></button>
                </form>
            }
            {
                hasLoginError && <strong className="form-error">Credentials are invalid</strong>
            }
        </>
    );
}