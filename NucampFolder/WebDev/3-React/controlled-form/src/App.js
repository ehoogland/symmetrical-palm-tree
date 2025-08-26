import { useState } from 'react';
// submit button is only visible when there is input
const ControlledForm = () => {
const [inputValue, updateInputValue] = useState('');
    const handleChange = (e) => {
        console.log(e.target.value);
        updateInputValue(e.target.value);
    };

    return (
        <form>
            <input value={inputValue} onChange={handleChange} />
            {inputValue && <button type='submit'>Submit</button>}
        </form>
    );
};

function App() {
   return <ControlledForm />;
}

export default App;
// Example 2: Controlled LoginForm
/*
import { useState } from 'react';

const initialValues = {    username: '',    password: ''};const LoginForm = () => {    const [formValues, updateFormValues] = useState(initialValues);
        const { username, password } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        updateFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    value={username}
                    onChange={handleChange}
                    name='username'
                    placeholder='Enter your username'
                />
            </div>
            <div>
                <input
                    value={password}
                    onChange={handleChange}
                    name='password'
                    placeholder='Enter your password'
                />
            </div>
            {username && password && <button type='submit'>Login</button>}
        </form>
    );
};
*/