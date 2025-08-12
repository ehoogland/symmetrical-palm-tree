/** 
 * Exercise: converting to class component (to understand legacy React)
 * Step 1 of conversion to class component: 
 * Import necessary modules, in this case, React (keep the heart image import)
 */
import { Component } from 'react';
import HeartLogo from './assets/heart.svg';
// In React, "props" (short for properties) are a mechanism for passing data from parent components
// to child components. They allow components to be dynamic and reusable by providing them with
// different data.
// In this case, the message variable is a string that will be passed as a prop to the Heart component,
// which is then used to display a message inside the heart image.

// The message variable is defined outside the component and is used to pass a string to the Heart
// component, which will render it inside a heart image.
// The Heart component is defined as a functional component that receives props and uses the message 
// prop to display a message inside a heart image along with an image of a heart. As a prop, inside the
// Heart component, it can be accessed via `props.msg`.
//console.log(props);

/** Exercise: converting to class component (to understand legacy React)
 *  Step 2: Replace 'const Heart = (props) => {'
 *  with 'class Heart extends Component {'
 */
 class Heart extends Component {

    // console.log(props); // quick check to see what props are being passed to the Heart component. 
    
    // The Heart component is a functional component that: i. takes props as an argument, and
    // ii. returns JSX to be rendered in the application.
    
    // This takes the string contained in the message variable and passes it to the 
    // Heart component to render inside a heart image.
    // The image is imported from heart.svg and the paragraph displays the message.
   /**
    * Step 3: Implement the render method by wrapping the JSX in a return statement.
    * @returns {JSX.Element} The rendered Heart component.
    * Step 4: Update the JSX to use this.props instead of props.
    * Change content of <div className='heart'> to use this.props.msg instead of props.msg
    */
    render() {
      return (
          <div className='heart'>
            <img className='heart-img' src={HeartLogo} alt='heart' />
            <p className='heart-message'>{this.props.msg}</p>
          </div>
      );
    } // end render
}

export default Heart;