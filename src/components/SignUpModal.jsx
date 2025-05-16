import React, { useState } from 'react';
import './SignUpModal.css';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const SignUpModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = 'Valid email is required';
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (form.confirm_password !== form.password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    if (!form.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!form.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      console.log('Registration data (mock):', form);
      
      // Always succeed in mock mode
      if (onSuccess) {
        onSuccess(`Account created for ${form.email}! You can now log in.`);
      }
      
      onClose();
      setIsSubmitting(false);
    }, 1000); // Simulate a 1-second delay for the API call
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input 
            name="first_name" 
            placeholder="First Name *" 
            onChange={handleChange} 
            disabled={isSubmitting}
          />
          {errors.first_name && <p className="error">{errors.first_name}</p>}
          
          <input 
            name="last_name" 
            placeholder="Last Name *" 
            onChange={handleChange} 
            disabled={isSubmitting}
          />
          {errors.last_name && <p className="error">{errors.last_name}</p>}
          
          <input 
            name="email" 
            placeholder="Email *" 
            onChange={handleChange} 
            disabled={isSubmitting}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          
          <div className="input-wrapper">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password *"
              onChange={handleChange}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
            <span className="icon clickable" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <MdVisibility /> : <MdVisibilityOff />}
            </span>
          </div>
          {errors.confirm_password && <p className="error">{errors.confirm_password}</p>}
          
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default SignUpModal;