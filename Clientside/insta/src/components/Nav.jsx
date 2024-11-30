import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-links">
          <div><Link to="/">Home</Link></div>
        <div><Link to="/about">About</Link></div>
          <div><Link to="/contact">Contact</Link></div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;