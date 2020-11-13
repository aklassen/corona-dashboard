import { render, screen } from '@testing-library/react';
import App from './App';

test('renders heading text', () => {
  render(<App />);
  const heading = screen.getByText(/corona dashboard/i);
  expect(heading).toBeInTheDocument();
});
