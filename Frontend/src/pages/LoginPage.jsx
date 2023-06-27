import React, { useState } from 'react';
import '../Styles/LoginPage.css';
import logo from '../Components/assets/Images/logo.png';
import imagen from '../Components/assets/Images/image.jpg';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError('Please enter your email');
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Please enter your password');
    } else {
      setPasswordError('');
    }

    // Additional validation rules can be added here

    if (email && password) {
      // Submit the form or perform further actions
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <img src={logo} alt="logo" className="logo" />
        <div className="login-box">
          <h2 className='sign-in'>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className={`form-input ${emailError ? 'is-invalid' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className={`form-input ${passwordError ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>
      
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
        <div className='footer'></div>
      </div>

      <div className="image-container" style={{ backgroundImage: `url(${imagen})`, backgroundSize: 'cover' }}></div>
    </div>
  );
}

export default LoginPage;
