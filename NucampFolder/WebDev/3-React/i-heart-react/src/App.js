
import HeartsList from './components/HeartsList';
import Header from './components/Header';
import './App.css';

// Note that function App(), the App component, is the main component that renders the Header and Heart components.
// It is the entry point of the React application and is typically rendered in the root element of the HTML file.
// The App component is the main component of the React application.
// It assigns the message variable to the Heart component as a prop.
// It is a functional component that returns JSX to be rendered in the application.
function App() {
  return (
    <>
      <Header />
      <HeartsList />
    </>
  );
};
// <> and </> are React Fragments, which allow you to group a list of children without adding extra nodes to the DOM.
// This is useful for returning multiple elements from a component without wrapping them in a div.
// A top level component refers to the outermost component
// that is rendered in the application, which in this case is the App component. */}

export default App;
