import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from './store';
import App from './App';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/vegan ingredients & recipes/i);
  expect(linkElement).toBeInTheDocument();
});
/**
 * Test suite for the App component
 * This test checks if the App component renders correctly by looking for
 * the presence of the "Vegan Ingredients & Recipes" text in the document.
 * It uses React Testing Library to render the component within the necessary
 * context providers: Redux Provider for state management and MemoryRouter
 * for routing.
 * The test passes if the specified text is found in the rendered output,
 * indicating that the App component has been rendered successfully.
 * 
 * MemoryRouter is used here to provide routing context for components that
 * rely on React Router, without needing a full browser environment.
 */