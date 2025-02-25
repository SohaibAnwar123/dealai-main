import React, { useState, useEffect } from 'react';
import './index.css';
import { Typography } from '@mui/material';
import Button from '../../../components/Button';
import CheckboxIcon from '../../../assets/svg/checkbox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../constants';
import nameImage from '../../../assets/images/mainLogo.png';
import LogoIcon from '../../../assets/svg/logoIcon';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DocumentIcon from '../../../assets/svg/DocumentIcomn';

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/passwords/verify-email`, { email });
      if (response.data.message === 'OTP sent to your email') {
        toast.success('OTP sent to your email');
        setOtpSent(true);
      } else {
        toast.error('Email does not exist');
      }
    } catch (err) {
      toast.error('Error verifying email');
      console.error('Error verifying email:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/passwords/verify-otp`, { email, otp });
      if (response.data.message === 'OTP verified successfully') {
        toast.success('OTP verified');
        setVerifiedOtp(true);
      } else {
        toast.error('Invalid OTP');
      }
    } catch (err) {
      toast.error('Error verifying OTP');
      console.error('Error verifying OTP:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/passwords/reset-password`, { email, newPassword });
      if (response.data.message === 'Password updated successfully') {
        toast.success('Password reset successful');
        setIsForgotPassword(false);
        setOtpSent(false);
        setVerifiedOtp(false);
        setNewPassword('');
      } else {
        toast.error('Error resetting password');
      }
    } catch (err) {
      toast.error('Error resetting password');
      console.error('Error resetting password:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      if (response.data && response.data.user) {
        localStorage.setItem('isLoggedIn', '1');
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('userName', response.data.user.userName);
        localStorage.setItem('isPaid', response.data.user.isPaid);
        localStorage.setItem('AccountDate', response.data.user.created_at);
        const userId = response.data.user.id;
        toast.success('Login successful');
        try {
          const firmResponse = await axios.get(`${BASE_URL}/firms/getFirm/${userId}`);
          if (firmResponse.data) {
            toast.success('Firm found');
            setTimeout(() => {
              navigate('/homeNda');
            }, 2000);
          } else {
            navigate('/createAccount');
          }
        } catch (err) {
          if (err.response && err.response.status === 404) {
            navigate('/createAccount');
          } else {
            toast.error('Error fetching firm details');
          }
          console.error('Error fetching firm details:', err);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = () => {
    navigate('/CreateAccount');
  };

  return (
    <div className='main'>
      <ToastContainer />
      <div className='login-card-detail'>
        <div className='login-card-detail-body'>
          <img src={nameImage} alt="" />
        </div>
        <p className='login-card-detail-body-text fs24'>
        Great to See You Again!
        </p>
        <div className='login-card-fields'>
          {!isForgotPassword && (
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label className='fs16' style={{color: '#353535'}}>
                Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label className='fs16' style={{color: '#353535'}}>
                Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff  sx={{color:"#8A8A8A"}}/> : <Visibility  sx={{color:"#8A8A8A"}} />}
                  </div>
                </div>
              </div>
              <div className='forgot-password-main'>
                <div className='rememberMe'>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    id="rememberMe"
                  />
                  <label htmlFor="rememberMe">
                    <Typography fontSize={"12px"} fontWeight={400} color={"#8A8A8A"}>Remember Me</Typography>
                  </label>
                </div>
                <Typography fontSize={"12px"} fontWeight={400} color={"#8A8A8A"} sx={{ cursor: "pointer" }} onClick={() => setIsForgotPassword(true)}>Forget Password</Typography>
              </div>
              <div className="input-group-button">
                <Button text="Login" className={"button-components-login"} isLoading={isLoading} />
              </div>
            </form>
          )}
          {isForgotPassword && !otpSent && (
            <form onSubmit={(e) => { e.preventDefault(); handleForgotPassword(); }}>
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
              <div className="input-group-button">
                <Button text="Send OTP" className={"button-components-login"} isLoading={isLoading} />
              </div>
            </form>
          )}
          {otpSent && !verifiedOtp && (
            <form onSubmit={(e) => { e.preventDefault(); handleOtpVerification(); }}>
              <div className="input-group">
                <label>
                  <Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Enter OTP</Typography>
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="input-group-button">
                <Button text="Verify OTP" className={"button-components-login"} isLoading={isLoading} />
              </div>
            </form>
          )}
          {verifiedOtp && (
            <form onSubmit={(e) => { e.preventDefault(); handlePasswordReset(); }}>
              <div className="input-group">
                <label>
                  <Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>New Password</Typography>
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />
                  <div className="password-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </div>
                </div>
              </div>
              <div className="input-group-button">
                <Button text="Reset Password" className={"button-components-login"} isLoading={isLoading} />
              </div>
            </form>
          )}
          <div className="help-text">
            <Typography fontWeight={400}> Don't have an account? </Typography>
            <Typography fontWeight={600} lineHeight={"20px"} color={"#0F46D2"} onClick={handleNavigation} sx={{ cursor: "pointer" }}>Sign up</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
