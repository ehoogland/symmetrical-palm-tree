import { Component, useState } from 'react';

export class SimpleBtnCC extends Component {
	/* Explicit constructor */
	// constructor(props) {
	//     super(props);
	//     this.state = {
	//         btnColor: '#fff'
	//     };
	// }

	/* Implicit constructor/class fields syntax */
	state = {
		btnColor: '#fff'
	};
/**
 * As usual, we must never update the value of the state imperatively. That means we do not update the state using the assignment operator. The only time the assignment operator can be used to set the state is when it is initialized, whether using an explicit constructor or via the class fields syntax as shown above.
Instead, we must use a method of the this object called setState() that can only be used inside class components.
So if we wish to update the btnColor value to the value of '#000', for example, we should not use this syntax:
this.state.btnColor = '#000';
We must instead use:
this.setState({ btnColor: '#000' });

This makes a call to this.setState() and passes the name of the 
state property to update as a key, with the new value for that state.
 */
	setRandomBtnColor = () => {
		const randomColor =
			'#' + Math.floor(Math.random() * 16777215).toString(16);
		this.setState({ btnColor: randomColor });
	};
/**
 * This example sets an onClick event handler with the method setBtnColor(). 
 * When run, this method generates a random color formatted as a hex value. 
 * Then it calls this.setState(), passing an object containing a property 
 * with a key of btnColor along with the new value to set for it, the randomColor variable.
 * Inside the JSX returned from the render() method, the style prop for the button sets 
 * the backgroundColor style for the button, using the this.state.btnColor value.
 * This means that every time you click the button, the background color of the
 * button should change to a random color.
 * @returns {JSX.Element} A button that changes its background color when clicked.
 */
	render() {
		return (
			<button
				style={{ backgroundColor: this.state.btnColor }}
				onClick={this.setRandomBtnColor}
			>
				CC
			</button>
		);
	}
}
// Equivalent functional component
export const SimpleBtnFC = () => {
	const [btnColor, setBtnColor] = useState('#fff');

	const setRandomBtnColor = () => {
		const randomColor =
			'#' + Math.floor(Math.random() * 16777215).toString(16);
		setBtnColor(randomColor);
	};

	return (
		<button
			style={{ backgroundColor: btnColor }}
			onClick={setRandomBtnColor}
		>
			FC
		</button>
	);
};
/**
 * Main differences:
The function component uses the useState hook to initialize the local state value, 
and uses the setter function for that specific state value to update it. 
The class component uses either a constructor or class fields syntax to initialize 
the local state value, and uses this.setState() to update that value. 
Values are stored as properties of the this.state object.

The class component must use this to refer to its instance properties and methods. 
Did you notice that the function component code is simpler compared to the class component?
While there are multiple reasons to prefer function components these days over class components, 
one of the easiest to see and most compelling is that function components typically 
require writing less code to do the same thing.
 */
