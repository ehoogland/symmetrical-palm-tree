import { Component } from 'react';

/* Without destructuring props */

// export class HelloCC extends Component {
//     render() {
//         return <p>Hello {this.props.name}</p>;
//     }
// }

// export const HelloFC = (props) => {
//     return <p>Hello {props.name}</p>;
// };

/* With destructuring props */

export class HelloCC extends Component {
    render() {
        const { name } = this.props;
        return <p>Hello {name}!</p>;
    }
}

export const HelloFC = ({ name }) => {
    return <p>Hello {name}!</p>;
};
