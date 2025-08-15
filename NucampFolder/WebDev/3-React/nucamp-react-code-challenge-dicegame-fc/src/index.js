// added Component
import { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './dice.css';
/*
Functional approach:
const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // <18+ used ReactDOM.render

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
*/
// Modern class component approach:
class AppWrapper extends Component {
    render() {
        return (
            <StrictMode>
                <App />
            </StrictMode>
        );
    }
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<AppWrapper />);

/**
 * The key differences from the old class syntax are:

Still uses createRoot (React 18+ feature)
Still uses named imports (StrictMode instead of React.StrictMode)
Still separates root creation from rendering
The class component wraps the StrictMode and App
However, this is still not recommended because:

You're adding unnecessary complexity (a class component that doesn't need state or lifecycle methods)
The functional approach you currently have is simpler and more performant
React team recommends functional components as the default
Functional syntax is the best practice for React 18+!
 */