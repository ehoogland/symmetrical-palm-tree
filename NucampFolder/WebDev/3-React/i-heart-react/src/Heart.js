
import HeartLogo from './assets/heart.svg';
// In React, "props" (short for properties) are a mechanism for passing data from parent components
// to child components. They allow components to be dynamic and reusable by providing them with
// different data.
// In this case, the message variable is a string that will be passed as a prop to the Heart component,
// which is then used to display a message inside the heart image.

// The message variable is defined outside the component and is used to pass a string to the Heart
// component, which will render it inside a heart image.
// The Heart component is defined as a functional component that receives props and uses the message prop to display a message inside a heart image
// along with an image of a heart. As a prop, inside the Heart component, it can be accessed via `props.msg`.
//console.log(props);
 
  const Heart = (props) => {

    // console.log(props); // quick check to see what props are being passed to the Heart component. 
    
    // The Heart component is a functional component that: i. takes props as an argument, and
    // ii. returns JSX to be rendered in the application.
    
    // This takes the string contained in the message variable and passes it to the 
    // Heart component to render inside a heart image.
    
    return (
      <div className='heart'>
      {/* Rendering of Heart component with a self-closing tag and a prop of msg={message}. */}
      {/* The Heart component renders an image and a paragraph with the message. */}
      {/* The image is imported from heart.svg and the paragraph displays the message. */}
      <img className='heart-img' src={HeartLogo} alt='heart' />
      <p className='heart-message'>{props.msg}</p>
    </div>
  );
};

export default Heart;