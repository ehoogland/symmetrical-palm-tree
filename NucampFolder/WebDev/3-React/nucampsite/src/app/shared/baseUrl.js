// Use REACT_APP_BASE_URL to allow switching API hosts without editing source.
// Falls back to the common local development endpoint on 3001.
// Normalize the base URL so it always ends with a single trailing slash.
// This prevents errors when code concatenates paths like `baseUrl + 'campsites'`
// and the environment variable is set without a trailing slash (e.g. "http://localhost:3001").
const rawBase = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
export const baseUrl = rawBase.replace(/\/?$/, '/');