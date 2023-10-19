import React, { useState } from 'react'
import "./style.css";
import {Link, useNavigate,} from 'react-router-dom';
import mail from "../images/email.png";
import lock from "../images/lock.png";
import profile from "../images/icon.jpg";
import axios from "axios";

export const Signup = () => {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: ""
    });
    const handelChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isValidEmail = (email) => {
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailReg.test(email);
      };
    
      const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(password);
      };

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userName || !formData.email || !formData.password ) {
                alert('Please fill in all details');
                return;
            }
        const { email, password } = formData;
    
        if (!isValidEmail(email)) {
          alert('Please enter a valid email');
          return;
        }
      
        if (!isValidPassword(password)) {
          alert('Please enter a valid password');
          return;
        }
        try {
          let url = "https://buycars.onrender.com/auth/signup";
          const { data } = await axios.post(url, formData);
          console.log(data);
          nav("/login");
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <div>
      <form onSubmit={handelSubmit}>
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <div>
                            <h1>Registration</h1>
                            <div>
                                <img src={profile} alt="emial" className='email' />
                                <input type="text" placeholder='Enter Name' className='fill'
                                name='userName'
                                value={formData.userName}
                                onChange={handelChange}
                                />
                            </div>
                            <div className='mail-id'>
                                <img src={mail} alt="emial" className='email' />
                                <input type="email" placeholder='Enter Email-id' className='fill'
                                name="email"
                                value={formData.email}
                                onChange={handelChange}
                                />
                            </div>
                            <div className='mail-id'>
                                <img src={lock} alt="emial" className='email' />
                                <input type="password" placeholder='Enter New Password' className='fill'
                                name='password'
                                onChange={handelChange}
                                value={formData.password}
                                />
                            </div>
                            <div className='login-btn'>
                                <button type="submit" className='btn'>Register</button>
                            </div>
                            <div className='reg-link'>
                                <Link className='link' to='/login' style={{textDecoration:"none"}}>
                                <div className="inline-container">
                                <strong style={{color:"black"}}>If Account exist then : </strong>
                                <h2>Login !!</h2>
                                </div>
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