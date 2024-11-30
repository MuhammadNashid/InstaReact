import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            setMessage(response.data.message);
            setError(false);
            localStorage.setItem('token', response.data.token); // Save token in localStorage
        } catch (err) {
            setMessage(err.response?.data?.message || 'Something went wrong');
            setError(true);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                <button type="submit" style={{ padding: '10px 20px', width: '100%' }}>Login</button>
            </form>
            {message && (
                <p style={{ color: error ? 'red' : 'green', marginTop: '10px' }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Login;
