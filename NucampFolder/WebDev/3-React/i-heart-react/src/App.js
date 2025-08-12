/** 
 * Exercise: converting to class component (to understand legacy React)
 * Step 1 of conversion to class component: 
 * Import necessary modules, in this case, import React (keep the heart image import)
 */
import { Component } from 'react';  
import HeartsList from './components/HeartsList';
import Header from './components/Header';
import './App.css';

// Note that class App extends Component, the App component, 
// is the main component that renders the Header and Heart components.
// The App component is the top-level component in this React application.
// It is a class component that returns JSX to be rendered in the application through the render() method.

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <HeartsList />
      </>
    );
  }
}
// <> and </> are React Fragments, which allow you to group a list of children without adding extra nodes to the DOM.
// This is useful for returning multiple elements from a component without wrapping them in a div.
// A top level component refers to the outermost component
// that is rendered in the application, which in this case is the App component. */}

export default App;
