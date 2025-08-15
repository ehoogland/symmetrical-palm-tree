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

	setRandomBtnColor = () => {
		const randomColor =
			'#' + Math.floor(Math.random() * 16777215).toString(16);
		this.setState({ btnColor: randomColor });
	};

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
