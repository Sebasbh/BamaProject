import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LoginPage from '../../pages/LoginPage';

test('handleSubmit function', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })
  );

  render(<LoginPage />);

  const emailInput = screen.getByLabelText(/Dirección de correo electrónico/i);
  const passwordInput = screen.getByLabelText(/Contraseña/i);
  const submitButton = screen.getByText(/Enviar/i);

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  fireEvent.click(submitButton);

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(
    'http://backend-api.com/login',
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'password' }),
    })
  ));
});
