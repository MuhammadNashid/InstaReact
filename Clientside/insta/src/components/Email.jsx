import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Email.css";
function Email() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/emailvalidation', { email });
      setMessage('Verification email sent! Check your inbox.');
    } catch (error) {
      setMessage('Failed to send verification email.');
    }
  };

  return (
    <div className='email'>
      <h2 className='head2'>Email Verification</h2>
      <form onSubmit={handleSubmit}>
        <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Enter your email" />
        <button type="submit"><Link className='elink' to={'/Login'}>verify</Link></button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Email;