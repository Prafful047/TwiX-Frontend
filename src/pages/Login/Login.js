import React, { useState, useEffect } from 'react';
import twitterImage from '../../image/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './login.css';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpRequired, setOtpRequired] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');

  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      const userEmail = user.user.email;
      const logLoginHistory = async () => {
        try {
          await axios.post('https://twix-backend.onrender.com/login-history', { email: userEmail });
        } catch (err) {
          console.error('Error logging login history:', err);
        }
      };
      logLoginHistory();
      navigate('/');
    }

    if (googleUser) {
      const userEmail = googleUser.user.email;
      const checkOtpRequirement = async () => {
        try {
          const response = await axios.post('https://twix-backend.onrender.com/google-login', { email: userEmail });
          if (response.data.otpRequired) {
            setOtpRequired(true);
            setGoogleEmail(userEmail);
          } else {
            await axios.post('https://twix-backend.onrender.com/login-history', { email: userEmail });
            navigate('/');
          }
        } catch (err) {
          console.error('Error checking OTP requirement:', err);
        }
      };
      checkOtpRequirement();
    }
  }, [user, googleUser, navigate]);

  if (error || googleError) {
    console.log((error || googleError).message);
  }

  if (loading || googleLoading) {
    console.log('loading....');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('https://twix-backend.onrender.com/login', { email, password });
    if (response.data.otpRequired) {
      setOtpRequired(true);
    } else {
      signInWithEmailAndPassword(email, password);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
  const emailToVerify = googleEmail ? googleEmail : email;
  console.log("Email to verify OTP:", emailToVerify);
  const response = await axios.post('https://twix-backend.onrender.com/verify-otp', { email: emailToVerify, otp });
    if (response.data.success) {
      if (otpRequired && googleEmail) {
        await axios.post('https://twix-backend.onrender.com/login-history', { email: googleEmail });
        navigate('/');
      } else {
        signInWithEmailAndPassword(email, password);
      }
    } else {
      console.error('Invalid OTP');
    }
  };


  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <div className='login-container'>
      <div className='image-container'>
        <img className='image' src={twitterImage} alt="" />
      </div>
      <div className='form-container'>
        <div className='form-box'>
          <TwitterIcon style={{ color: 'skyblue' }} />
          <h2 className='heading'>Happening now</h2>
          <h3 className='heading1'>What Happening Today</h3>
          <form onSubmit={otpRequired ? handleOtpSubmit : handleSubmit}>
            <input
              type="email"
              className='email'
              placeholder='Email address'
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpRequired}
            />
            <input
              type="password"
              className='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              disabled={otpRequired}
            />
            {otpRequired && (
              <input
                type="text"
                className='otp'
                placeholder='Enter OTP'
                onChange={(e) => setOtp(e.target.value)}
              />
            )}
            <div className='btn-login'>
              <button type='submit' className='btn'>Login</button>
            </div>
          </form>
          <hr />
          <div className='google-button'>
            <GoogleButton
              className='g-btn'
              type='light'
              onClick={handleGoogleSignIn}
            />
          </div>
          <div>
            Don't have an account?
            <Link
              to='/signup'
              style={{
                textDecoration: 'none',
                color: 'skyblue',
                fontWeight: '600',
                marginLeft: '5px'
              }}>
              Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
