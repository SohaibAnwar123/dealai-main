import React, { useState } from 'react';
import './CreateAccount.css';
import { Typography } from '@mui/material';
import Button from '../../../components/Button';
import axios from 'axios';
import { BASE_URL } from '../../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
function CreateAccount({ onTaskComplete }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateFields = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email || !username || !password) {
      toast.error('All fields are required');
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateFields()) return;

    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        email: email,
        name: username,
        password: password,
      });

      console.log('Account Created:', response.data);
      if (response.data && !response.data.newUser.error) {
        localStorage.setItem('isLoggedIn', '1');
        localStorage.setItem('userName', username);
        localStorage.setItem('userId', response.data.newUser.id);
        localStorage.setItem('AccountDate', response.data.newUser.created_at);
        localStorage.setItem('isPaid', response.data.newUser.isPaid);
        localStorage.setItem('email', email);

        // Call the API to send the welcome email
        await axios.post(`${BASE_URL}/documents/sendwelmail`, {
          email: email,
          name: username,
        });

        toast.success('Signup successful');
        setTimeout(() => {
          onTaskComplete();
        }, 2000);
      } else {
        toast.error('Email Already Exist');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      toast.error(error.response?.data?.message || 'Error creating account');
    }
  };

  return (
    <div className="main">
      <div className='signup-card-detail'>
        <h1 className='signup-card-detail-body fs64 text-center mb-0' style={{fontWeight: '600'}}>
        Create Your Account
        </h1>
        <p className='login-card-detail-body-text fs24' style={{color: '#353535', fontWeight: '500'}}>
        Creating an account will let you save your preferences to reuse on your next NDA. <span className='d-block' style={{color: '#6C6C6C'}}>No Credit Card Needed.</span> 
        </p>
        <div className='SignUp-card-fields'>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>
                <Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Email</Typography>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>
                <Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>UserName</Typography>
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>
                <Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Password</Typography>
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff  sx={{color:"#8A8A8A"}} /> : <Visibility  sx={{color:"#8A8A8A"}}/>}
                </div>
              </div>
            </div>
            <div className="input-group-button">
              <Button text={"Create Account"} className={"button-components-login"} />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateAccount;
