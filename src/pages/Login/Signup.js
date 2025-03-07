import React, { useState } from 'react';
import twitterImage from '../../image/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import './login.css';
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser] = useSignInWithGoogle(auth);

    if (user || googleUser) {
        navigate('/');
        console.log(user);
        console.log(googleUser);
    }

    if (error) {
        console.log(error.message);
    }

    if (loading) {
        console.log('loading....');
    }

    const handleSubmit = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(email, password);

        const user = {
            username : username,
            name : name ,
            email : email,
            password : password
        }

        axios.post('https://twix-backend.onrender.com/register' , user)
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }

    return (
        <div className='login-container'>
            <div className='image-container'>
                <img className='image' src={twitterImage} alt="" />
            </div>
            <div className='form-container'>
                <div className='form-box'>
                    <TwitterIcon className='Twittericon' style={{ color: 'skyblue' }} />
                    <h2 className='heading'>Happening now</h2>
                    <h3 className='heading1'>Join Twitter Today</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            className='display-name'
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)} />
                        <input type="text"
                            className='display-name'
                            placeholder='Enter Full Name'
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input type="email"
                            className='email'
                            placeholder='Email address'
                            onChange={(e) => setEmail(e.target.value)} />
                        <input
                            type="password"
                            className='password'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)} />
                        <div className='btn-login'>
                            <button type='submit' className='btn'>SignUp</button>
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
                        Already have an account?
                        <Link
                            to='/login'
                            style={{
                                textDecoration: 'none',
                                color: 'skyblue',
                                fontWeight: '600',
                                marginLeft: '5px'
                            }}>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
