// src/components/LoginPage.jsx
import React, { useState } from 'react';

const LoginPage=()=> {
    const [val, setVal] = useState({
        email:"",
        pass:""
    });
    
   

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (val === 'user@example.com' && password === 'password') {
            alert('Login successful!');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setVal(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setVal(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <a href="/forgot-password">Forgot Password?</a>
            <p>Don't have an account? <a href="/register">Sign Up</a></p>
        </div>
    );
}

export default LoginPage;
