import { render, screen } from '@testing-library/react';

import App from '../App';

describe('App', () => {
  it('renders App', () => {
    render(<App />);

    const document1Button = screen.getByRole('link', { name: /document1/i });

    expect(document1Button).toBeInTheDocument();
  });
});
