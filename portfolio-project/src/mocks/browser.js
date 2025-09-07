import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
// This configures a Service Worker with the given request handlers. A Service worker
// is a script that the browser runs in the background, separate from a web page,
// opening the door to features that don't need a web page or user interaction.
// They include features like push notifications and background sync.

