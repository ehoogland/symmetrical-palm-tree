import { useState } from 'react';

// FUNCTIONAL COMPONENT VERSION (using React Hooks)
const DiceGame = () => {
    // useState hook replaces class component state
    // useState returns [stateValue, setterFunction]
    const [dice1, setDice1] = useState(0);
    const [dice2, setDice2] = useState(0);
    const [maxRoll] = useState(6); // We don't need a setter since maxRoll doesn't change

    // Regular function instead of class method
    // No need for arrow function since we're not worried about 'this' binding
    const rollDice = () => {
        const roll1 = Math.floor(Math.random() * maxRoll) + 1;
        const roll2 = Math.floor(Math.random() * maxRoll) + 1;
        // Instead of this.setState, we use the individual setter functions
        setDice1(roll1);
        setDice2(roll2);
    };

    // Return JSX directly instead of using render() method
    return (
        <>
            <div>
                <button onClick={rollDice}>Roll!</button>
            </div>
            <ResultMessage
                dice1={dice1}
                dice2={dice2}
            />
            <div>
                <span className={`dice dice-${dice1}`} />
                <span className={`dice dice-${dice2}`} />
            </div>
        </>
    );
};

/* CLASS COMPONENT VERSION (commented out for learning comparison)
class DiceGame extends Component {
    // implicit constructor/class fields syntax
    state = {
        dice1: 0,
        dice2: 0,
        maxRoll: 6
    };

    // Or, if using an explicit constructor:
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         dice1: 0,
    //         dice2: 0,
    //         maxRoll: 6
    //     };
    // }

    rollDice = () => {
        const roll1 = Math.floor(Math.random() * this.state.maxRoll) + 1;
        const roll2 = Math.floor(Math.random() * this.state.maxRoll) + 1;
        this.setState({ dice1: roll1, dice2: roll2 });
    };

    render() {
        return (
            <>
                <div>
                    <button onClick={this.rollDice}>Roll!</button>
                </div>
                <ResultMessage
                    dice1={this.state.dice1}
                    dice2={this.state.dice2}
                />
                <div>
                    <span className={`dice dice-${this.state.dice1}`} />
                    <span className={`dice dice-${this.state.dice2}`} />
                </div>
            </>
        );
    }
}
*/

// FUNCTIONAL COMPONENT VERSION (using React props)
const ResultMessage = ({ dice1, dice2 }) => {
    // Regular function instead of class method
    const getResult = (dice1, dice2) => {
        if (!dice1) {
            return 'nothing yet';
        }
        if (dice1 === 1 && dice2 === 1) {
            return 'snake eyes';
        }
        return dice1 + dice2;
    };

    // Calculate result directly in the component
    const result = getResult(dice1, dice2);
    
    // Return JSX directly instead of using render() method
    return <div>You rolled... {result}!</div>;
};

/* CLASS COMPONENT VERSION (commented out for learning comparison)
class ResultMessage extends Component {
    getResult = (dice1, dice2) => {
        if (!dice1) {
            return 'nothing yet';
        }
        if (dice1 === 1 && dice2 === 1) {
            return 'snake eyes';
        }
        return dice1 + dice2;
    };

    render() {
        const { dice1, dice2 } = this.props;
        const result = this.getResult(dice1, dice2);
        return <div>You rolled... {result}!</div>;
    }
}
*/

// FUNCTIONAL COMPONENT VERSION (simple component)
const App = () => {
    // Return JSX directly instead of using render() method
    return <DiceGame />;
};

/* CLASS COMPONENT VERSION (commented out for learning comparison)
class App extends Component {
    render() {
        return <DiceGame />;
    }
}
*/

export default App;
