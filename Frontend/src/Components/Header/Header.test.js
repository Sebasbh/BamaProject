import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
});

it('renders without crashing using createRoot', () => {
  createRoot(container).render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
});