import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      {/* MemoryRouter provides a Router context for tests */}
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // The app renders a page heading "Home"; use a role query to target the heading element specifically.
  expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
});
