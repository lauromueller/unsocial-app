import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('should find the corresponding component', () => {
  render(<App />);
  expect(screen.getByText(/unsocial/i)).toBeDefined();
});
