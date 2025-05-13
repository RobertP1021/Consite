import React, {useState} from 'react';
import './Login.css';
import logo from '../assets/logo.jpeg';
import illustration from '../assets/login-img.png';
import {MdEmail, MdVisibility, MdVisibilityOff} from 'react-icons/md';
import SignUpModal from '../components/SignUpModal';
import ForgotPass from '../components/ForgotPass';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showForgotPass, setShowForgotPass] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = (e) => {
      e.preventDefault();
      if (!email || !password) {
        setError('Please fill in both email and password.');
      } else {
        setError('');
        // Proceed to backend login...
        navigate('/dashboard');
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
            <form className="login-form" onSubmit={handleLogin}>
              <div className="input-wrapper">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span className="icon"><MdEmail /></span>
              </div>
              <div className="input-wrapper">
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className= "icon clickable" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </span>
              </div>
              <div className="form-footer">
                <a onClick={() => setShowForgotPass(true)} style={{ cursor: 'pointer' }}>
                    Forgot password?
                </a>
                </div>
              <button type="submit" className="login-button">Log In</button>
              <p className="signup-text">
                Don’t have an account? <a onClick={() => setShowSignUp(true)}>Sign Up</a>
              </p>
            </form>
          </div>
        </div>
        <div className="login-right">
          <img src={illustration} alt="Login Illustration" />
        </div>
      </div>

        {error && <p className="error-message">{error}</p>}
        {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
        {showForgotPass && <ForgotPass onClose={() => setShowForgotPass(false)} />}

    </>  
    );
  };

export default Login;
