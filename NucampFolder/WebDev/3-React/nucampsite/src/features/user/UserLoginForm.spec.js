import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import UserLoginForm from './UserLoginForm';

describe('UserLoginForm', () => {
  test('shows validation messages and disables submit until valid', async () => {
    render(
      <Provider store={store}>
        <UserLoginForm />
      </Provider>
    );

    // open modal
    const openBtn = screen.getByRole('button', { name: /login/i });
    await userEvent.click(openBtn);

    // wait for inputs to appear
    const username = await screen.findByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);

    // type an invalid short username and blur to trigger validation
    await userEvent.type(username, 'abc');
    await userEvent.tab(); // move focus to trigger touched

  // validation message should appear for username
  expect(await screen.findByText(/must be at least 6 characters/i)).toBeInTheDocument();

    // type a valid username and invalid password
    await userEvent.clear(username);
    await userEvent.type(username, 'validuser');
    await userEvent.type(password, 'short');

    // submit by pressing Enter in the password field should NOT set a user yet
    await userEvent.type(password, '{enter}');

    // store should still have null currentUser (no login happened)
    const stateUser = store.getState().user.currentUser;
    expect(stateUser).toBeNull();
  });

  test('submits valid form and sets currentUser in store', async () => {
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
    await userEvent.type(username, 'validuser');
    await userEvent.type(password, 'validpassword');

    // Submit via Enter key
    await userEvent.type(password, '{enter}');

    // After submit, Redux store should have a currentUser object
    const stateUser = store.getState().user.currentUser;
    expect(stateUser).not.toBeNull();
    expect(stateUser.username).toBe('validuser');
  });
});
