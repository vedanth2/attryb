import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
 const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
 });

 const { name, email, password, password2 } = formData;

 const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

 const onSubmit = async (e) => {
    e.preventDefault();
    // perform user authentication
 };

 return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" value="Register" />
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      
      </div>
 )}