import React, { useState, useRef } from 'react';
import './Login.css';
import logo from '../assets/logo.jpeg';
import illustration from '../assets/login-img.png';
import { MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import SignUpModal from '../components/SignUpModal';
import ForgotPass from '../components/ForgotPass';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showForgotPass, setShowForgotPass] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();
    const formRef = useRef(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError('Please fill in both email and password.');
            return;
        }
        
        setIsLoggingIn(true);
        setError('');
        
        try {
            // Use the login function from AuthContext
            const result = await login(email, password);
            
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An error occurred during login. Please try again.');
            console.error('Login error:', err);
        } finally {
            setIsLoggingIn(false);
        }
    };
    
    return (
    <>
     <div className="login-container">
        <div className="login-left">
          <div className="login-header">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="login-content">
            <h1>Welcome back!</h1>
            <p>Please enter your details</p>
            <form className="login-form" ref={formRef} onSubmit={handleLogin}>
              <div className="input-wrapper">
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoggingIn}
                />
                <span className="icon"><MdEmail /></span>
              </div>
              <div className="input-wrapper">
                <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoggingIn}
                />
                <span className="icon clickable" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </span>
              </div>
              <div className="form-footer">
                <a onClick={() => setShowForgotPass(true)} style={{ cursor: 'pointer' }}>
                    Forgot password?
                </a>
              </div>
              {error && <p className="error-message">{error}</p>}
              <button 
                type="submit" 
                className="login-button"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Logging in...' : 'Log In'}
              </button>
              <p className="signup-text">
                Don't have an account? <a onClick={() => setShowSignUp(true)}>Sign Up</a>
              </p>
            </form>
          </div>
        </div>
        <div className="login-right">
          <img src={illustration} alt="Login Illustration" />
        </div>
      </div>

        {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
        {showForgotPass && <ForgotPass onClose={() => setShowForgotPass(false)} />}
    </>  
    );
};

export default Login;