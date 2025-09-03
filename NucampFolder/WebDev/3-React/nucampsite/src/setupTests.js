// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mute noisy logger output per-test using jest spies, and restore after each test.
beforeEach(() => {
	jest.spyOn(console, 'group').mockImplementation(() => {});
	jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
	jest.restoreAllMocks();
});
