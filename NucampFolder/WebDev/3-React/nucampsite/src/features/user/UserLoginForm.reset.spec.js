import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import UserLoginForm from './UserLoginForm';

describe('UserLoginForm reset behavior', () => {
  test('resetForm clears fields after successful submit', async () => {
    render(
      <Provider store={store}>
        <UserLoginForm />
      </Provider>
    );

    // open modal
    const openBtn = screen.getByRole('button', { name: /login/i });
    await userEvent.click(openBtn);

    const username = await screen.findByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);

    // Fill valid credentials
    await userEvent.type(username, 'resetuser');
    await userEvent.type(password, 'resetpassword');

    // Submit
    await userEvent.type(password, '{enter}');

    // Re-open modal to inspect fields after reset
    await userEvent.click(openBtn);

    const usernameAfter = await screen.findByLabelText(/username/i);
    const passwordAfter = screen.getByLabelText(/password/i);

    expect(usernameAfter.value).toBe('');
    expect(passwordAfter.value).toBe('');
  });
});
