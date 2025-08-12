import { Component } from 'react';  // Step 1 of conversion to class component: Import necessary modules, in this case, React

class Header extends Component {
  render() {
    return (
      <div className='App-header'>
        <h1>I ❤️ React</h1>
      </div>
    );
  }
}

/*
const Header = () => {
  return <div className='App-header'><h1>I ❤️ React</h1></div>;
};
// The Header component is a functional component that returns JSX to be rendered in the application.
// It is a simple component that displays a header with the text "I ❤️ React".
// The Header component is exported so that it can be used in other parts of the application.
// This allows the Header component to be imported and used in other files, such as App.js
// or other components, making it a reusable and modular part of the React application.
// The export default statement allows the Header component to be imported without using curly braces.
// The Header component is a functional component that returns JSX to be rendered in the application.
// It is a simple component that displays a header with the text "I ❤️ React".
*/
export default Header;
