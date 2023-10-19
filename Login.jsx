import React, { useState } from 'react'
import axios from 'axios';
import './style.css';
import {Link, useNavigate} from 'react-router-dom';
import email from "../images/email.png";
import lock from "../images/lock.png";
import profile from "../images/icon.jpg";

export const Login = () => {
  const nav = useNavigate();
  const [fdata, setFdata] = useState({ email: '', password: '' });
  
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFdata({ ...fdata, [name]: value });
  };
  const isValidEmail = (email) => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailReg.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fdata.email || !fdata.password) {
      alert('Please fill in all details');
      return;
    }
    const { email, password } = fdata;

    if (!isValidEmail(email)) {
      alert('Please enter a valid email');
      return;
    }
    if (!isValidPassword(password)) {
        alert('Please enter a valid password');
        return;
      }
      try {
        const url = 'https://buycars.onrender.com/auth/login';
        const { data } = await axios.post(url, fdata);
        console.log(data);
        localStorage.setItem('token', data.token);
        nav('/home')
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert('Invalid credentials');
        }
      }
    };

  return (
    <div>
       <form onSubmit={handleSubmit}>
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <div className='imgs'>
                            <div className='container-image'>
                                <img src={profile} alt='profile' className='profile'/>
                            </div>
                        </div>
                        <div>
                            <h1 className='LHeader'>Login</h1>
                            <div>
                                <img src={email} alt="emial" className='email' />
                                <input type="email" placeholder='Enter Email-id' className='fill'
                                name='email'
                                onChange={handleChange}
                                value={fdata.email}
                                />
                            </div>
                            <div className='second-input'>
                                <img src={lock} alt='password' className='email' />
                                <input type="password" placeholder='Enter Password' className='fill'
                                name='password'
                                onChange={handleChange}
                                value={fdata.password}
                                />
                            </div>
                            <div className='login-btn'>
                                    <button type="submit" className='btn'>Login</button>
                            </div>
                            <div className='reg-link'>
                                <Link className='link' to='/' style={{textDecoration:"none"}}>
                                <h2>Register Now</h2>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}