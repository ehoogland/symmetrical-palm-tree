import { Component } from 'react'
import CandyColoredHeart from './CandyColoredHeart'

const messages = [
    'cool cud',
    'me my <3',
    'you are bear',
    'team bear',
    'time hug',
    'fang',
    'bog love',
    'me have love',
    'all hover',
    'sweat poo',
    'u hack',
    'stank love',
    'heart me',
    'wink bear',
    'bear bear',
    'be my bear',
    'yank o way',
    'mage love',
    'oy',
    'in a fan'
];

// The HeartsList component is a functional component that maps through an array of messages
// and renders a Heart component for each message.
// It returns a div with a className of 'hearts-container'.
// Inside this div, it maps through the messages array and
// renders a Heart component for each message.
// Each Heart component receives a message as a prop;
// the message is displayed inside the heart image
// We are passing a callback function to the map method that takes
// each message and returns a Heart component, with the message as a prop.
class HeartsList extends Component {
    render() {
        return (
            <div className='hearts-container'>
                {messages.map((message, idx) => (
                    <CandyColoredHeart key={idx} msg={message} />
                ))}
            </div>
        );
    }
}

export default HeartsList;