import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginPage from '../../pages/LoginPage';

describe('LoginPage', () => {
  it('renders the login page correctly', () => {
    render(<LoginPage />);

    // Verifica que los elementos necesarios se encuentren en la página de inicio de sesión
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('displays error messages for empty email and password fields', () => {
    render(<LoginPage />);
    const submitButton = screen.getByText('Submit');

    // Simula el envío del formulario sin completar los campos
    fireEvent.click(submitButton);

    // Verifica que se muestren los mensajes de error correspondientes
    expect(screen.getByText('Please enter your email')).toBeInTheDocument();
    expect(screen.getByText('Please enter your password')).toBeInTheDocument();
  });

  // Agrega más pruebas según sea necesario para validar el comportamiento adicional del componente LoginPage
});
