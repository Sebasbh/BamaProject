import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/LoginPage.css';
import logo from '../Components/assets/Images/logo.png';
import imagen from '../Components/assets/Images/image.jpg';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError('Por favor introduzca su correo electrónico');
      return;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Por favor introduzca su contraseña');
      return;
    } else {
      setPasswordError('');
    }

    if (email && password) {
      try {
        const response = await fetch('http://localhost:8000/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('jwt', data.token); 
          alert('Credenciales válidas');
          navigate('/Home');
        } else {
          alert(`Error: ${data.mensaje}`);
        }
      } catch (err) {
        console.error(err);
        alert('Ocurrió un error al realizar la solicitud de inicio de sesión.');
      }
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
              <label htmlFor="email">Dirección de correo electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="Introduzca su correo electrónico"
                className={`form-input ${emailError ? 'is-invalid' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                className={`form-input ${passwordError ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>
      
            <button type="submit" className="submit-button">Enviar</button>
          </form>
        </div>
        <div className='footer'></div>
      </div>

      <div className="image-container" style={{ backgroundImage: `url(${imagen})`, backgroundSize: 'cover' }}></div>
    </div>
  );
}

export default LoginPage;
