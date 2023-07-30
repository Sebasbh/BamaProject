import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

let container = null;

beforeEach(() => {
  // Configura un contenedor DOM como el destino de renderizado de la prueba
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Limpia en la salida de la prueba
  container.remove();
});

it('renders without crashing using createRoot', () => {
  createRoot(container).render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
});