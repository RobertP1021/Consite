import React, { useState, useEffect} from 'react';
import './ForgotPass.css';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const ForgotPass = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [form, setForm] = useState({
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  useEffect(() => {
    setShowPassword(false);
    setShowConfirm(false);
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setEmailError('Valid email is required');
    } else {
      setEmailError('');
      setStep(2);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePasswords = () => {
    const newErrors = {};
    if (!form.password || form.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (form.confirm_password !== form.password)
      newErrors.confirm_password = 'Passwords do not match';
    return newErrors;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validatePasswords();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Submit new password for:', email, form.password);
      // send to backend here
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{step === 1 ? 'Forgot Password' : 'Reset Password'}</h2>

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error">{emailError}</p>}
            <button type="submit">Next</button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit}>
            <div className="input-wrapper">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password *"
                onChange={handleChange}
              />
              <span className="icon clickable" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
              </span>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}

            <div className="input-wrapper">
              <input
                name="confirm_password"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm Password *"
                onChange={handleChange}
              />
              <span className="icon clickable" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <MdVisibility /> : <MdVisibilityOff />}
              </span>
            </div>
            {errors.confirm_password && <p className="error">{errors.confirm_password}</p>}

            <button type="submit">Reset Password</button>
          </form>
        )}

        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default ForgotPass;
