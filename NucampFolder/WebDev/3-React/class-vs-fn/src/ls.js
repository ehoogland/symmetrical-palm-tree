import { Component } from 'react';
// Used prior to Hello.js Class/Functional Component implementation
// to show the difference in syntax
export class HelloClass extends Component {
    render() {
        return <p>Hello world - class!</p>;
    }
}

export const HelloFn = () => {
    return <p>Hello world - function!</p>;
};
