import { useState } from "react";
import { useHistory } from 'react-router-dom';

const CreateUser = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, password, email, first_name, last_name };

        setIsPending(true);

        fetch("http://localhost:8000/users/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(response => {
            if (!response.ok) {
                if (response.status === 409) {
                    throw Error('This username is already taken');
                } else if (response.status === 422) {
                    response.json().then(data => {
                        const location = data.detail[0].loc[1]
                        console.log(location)
                        console.log(data)
                        if (location === "first_name") {
                            setErrorMessage('first name should be at least 2 characters long')
                        } else if (location === 'last_name') {
                            setErrorMessage('last name should be at least 2 characters long')
                        } else if (location === "username") {
                            setErrorMessage('username should be between 2 and 15 characters long')
                        } else if (location === "password") {
                            setErrorMessage('password should be between 2 and 15 characters long')
                        } else if (location === 'email') {
                            setErrorMessage(data.detail[0].msg)
                        }
                    })
                    throw Error('Validation failed. Please check your input.');
                } else {
                    throw Error('Failed to create user');
                }
            }
            setIsPending(false);
            history.push('/');
        }).catch(error => {
            setErrorMessage(error.message || 'An error occurred.');
            setIsPending(false);
        });

    }

    return (
        <div className="create-user">
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input
                    type='text'
                    placeholder="Write your first name here..."
                    required
                    value={first_name}
                    onChange={(event) => setFirstName(event.target.value)}
                />
                <label>Last Name</label>
                <input
                    type='text'
                    placeholder="Write your last name here..."
                    required
                    value={last_name}
                    onChange={(event) => setLastName(event.target.value)}
                />
                <label>Username</label>
                <input
                    type='text'
                    placeholder="Write your username here..."
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <label>Password</label>
                <div className="password-input-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Write your password here..."
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type="button" className="password-toggle-button" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <label>Email</label>
                <input
                    type='text'
                    placeholder="Write your email here..."
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                {errorMessage && <p className="error">{errorMessage}</p>}
                {!isPending && <button>Add User</button>}
                {isPending && <button disabled>Please wait...</button>}
            </form>
        </div>
    );
}

export default CreateUser;
