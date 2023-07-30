import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';

describe('Footer', () => {
  test('muestra el texto correcto', () => {
    render(<Footer />);
    expect(screen.getByText('Generamos la ventaja competitiva que necesitas.')).toBeInTheDocument();
  });

  test('tiene el estilo correcto', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('bg-dark');
    expect(footerElement).toHaveClass('text-light');
    expect(footerElement).toHaveClass('text-center');
    expect(footerElement).toHaveClass('py-4');
  });
});
