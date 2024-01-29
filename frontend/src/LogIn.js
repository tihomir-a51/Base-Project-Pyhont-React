import { useState } from "react";
import { useHistory } from 'react-router-dom';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPending, setIsPending] = useState(false);

    const history = useHistory();

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsPending(true)

        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'grant_type': 'password',
                'username': username,
                'password': password,
            }).toString(),

        }).then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    response.json().then(data => {
                        const message = data.detail
                        setErrorMessage(message)
                    })
                }
            }
            return response.json();
        }).then(data => {
            console.log(data.access_token)
            localStorage.setItem('token', data.access_token);
            setIsPending(false)
            history.push('/')
        }).catch(error => {
            setErrorMessage(error.message || 'An error occurred.');
            setIsPending(false);
        });

    }

    return (
        <div className="login">
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input
                    type='text'
                    id='username'
                    placeholder="Write your username name here..."
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                />
                <label htmlFor="password">Password</label>
                <div className="login-password-input-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        placeholder="Write your password here..."
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="current-password"

                    />
                    <button type="button" className="login-toggle-button" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    {!isPending && <button>Login</button>}
                    {isPending && <button disabled>Please wait...</button>}
                </div>

            </form>

        </div>
    );
}

export default LogIn;