import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const res=await axios.post("http://localhost:3009/api/login",formData)
      console.log(res)
      if(res.status==201){
        alert("successfully logined!")
        navigate('/')
      }else{
        alert(res.data.msg)
      }
    } catch (error) {
      console.log(error);
      
    }
  };


  return (
    <div className="main">
     
      <form className="form" onSubmit={handleSubmit}>
      <h1>Login Form</h1>
        <div className="form1">
          <input  type="email"  name="email" placeholder="enter email"  value={formData.email}  onChange={handleChange}  required/>
          <input  type="password"  name="pass" placeholder="password"  value={formData.pass}  onChange={handleChange}  required/>
        </div>
        <div className="pass"><Link to={'/Email'} className="pass" >Forgot Password?</Link></div>
        <button type="submit">Login</button>
        <div className="signup"> Create New Account <Link to={'/Email'}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;