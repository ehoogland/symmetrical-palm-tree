import { Component } from 'react';
import HeartSVG from './HeartSVG';

const colors = [
    '#b8e3f5',
    '#f5b8e4',
    '#b8f5b9',
    '#f5f3b8',
    '#e3b8f5',
    '#fffcf2'
];
// The CandyColoredHeart component is a class component that displays a heart with a random color
// and a message passed as a prop. It uses the HeartSVG component to render the heart SVG.
// The component generates a random color from the colors array and applies it as the background color
// of the heart. The message is displayed inside the heart.
// The CandyColoredHeart component is a class component that takes a message as a prop
// and renders a heart with a random color from the colors array.
// It uses the HeartSVG component to render the heart shape and displays the message inside it.
// The component uses inline styles to set the background color of the heart based on a randomly selected
// color from the colors array. The message is displayed in a paragraph element inside the heart div.
// Recall that Math.random() generates a random number between 0 inclusive and 1 exclusive [0,1), which is then multiplied
// by the length of the colors array, effectively giving us a random index to select a color.
// Math.floor() is used to round down the random number to the nearest whole number, ensuring it is a
// valid index for the colors array.
// In class components, we access props using this.props instead of the props parameter.
// (By contrast, the destructuring approach extracts the msg property directly from the props object
// in the function parameter, making the code cleaner since you don't have to write props.msg 
// every time - you can just use ({msg}) as the parameter, then msg instead of props.msg.)

// FUNCTIONAL COMPONENT VERSION (commented out):
// const CandyColoredHeart = (props) => {
//     const randomCol = colors[Math.floor(Math.random() * colors.length)];// Math.floor gives us a whole number
//     return (
//         <div className='heart'>
//             <div className='heart-img'>
//             <HeartSVG col={randomCol}/>
//             <p className='heart-message'>{props.msg}</p>
//             </div>
//         </div>
//     );
// };

// CLASS COMPONENT VERSION:
class CandyColoredHeart extends Component {
    render() {
        const randomCol = colors[Math.floor(Math.random() * colors.length)];// Math.floor gives us a whole number
        return (
            <div className='heart'>
                <div className='heart-img'>
                <HeartSVG col={randomCol}/>
                <p className='heart-message'>{this.props.msg}</p>
                </div>
            </div>
        );
    }
}

export default CandyColoredHeart;
