// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Suppress noisy React Router future-flag warnings during tests.
// These are intentional deprecation notices and don't affect test correctness.
const originalWarn = console.warn;
console.warn = (...args) => {
	try {
		const msg = String(args[0] || '');
		if (msg.includes('React Router Future Flag Warning') || msg.includes('Relative route resolution within Splat routes')) {
			return; // swallow known router future-flag warnings
		}
	} catch (e) {
		// fall through to default warn
	}
	originalWarn.apply(console, args);
};
