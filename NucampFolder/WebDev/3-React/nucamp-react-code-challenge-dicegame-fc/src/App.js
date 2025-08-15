//import { useState } from 'react'; // Uncomment if using functional component with hooks
import { Component } from 'react';

class DiceGame extends Component {
    // Old constructor syntax:
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         dice1: 0,
    //         dice2: 0,
    //         maxRoll: 6
    //     };
    // }

    // Modern class property syntax:
    state = {
        dice1: 0,
        dice2: 0,
        maxRoll: 6
    };
    // Arrow Function Class Property (or Class Field with Arrow Function)
    rollDice = () => {
        const { maxRoll } = this.state;
        const roll1 = Math.floor(Math.random() * maxRoll) + 1;
        const roll2 = Math.floor(Math.random() * maxRoll) + 1;
        this.setState({ dice1: roll1, dice2: roll2 });
    };
    /**
     * Automatic this binding: Arrow functions automatically bind this to the class instance
     * No need for .bind(this) in the constructor
     * Cleaner code: No explicit binding required
     * Old way: this.rollDice = this.rollDice.bind(this); which is manual binding
     * New way: Use arrow functions for class methods

    */

    render() {
        const { dice1, dice2 } = this.state;
        return (
            <>
                <div>
                    <button onClick={this.rollDice}>Roll Dice</button>
                </div>
                <ResultMessage dice1={dice1} dice2={dice2} />
                <div>
                    <span className="dice">{dice1}</span>
                <span className="dice">{dice2}</span>
            </div>
        </>
    );
}

}

function ResultMessage(props) {
    const getResult = (dice1, dice2) => {
        if (dice1 === 1 && dice2 === 1) {
            return 'snake eyes';
        }
        if (dice1 === 0 || dice2 === 0) {
            return 'nothing yet';
        }
        return dice1 + dice2;
    };

    const { dice1, dice2 } = props;
    const result = getResult(dice1, dice2);
    
    return <div>Result: {result}</div>;
}

const App = () => {
    return <DiceGame />;
};

export default App;

