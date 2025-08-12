import { HelloCC, HelloFC } from './Hello'; // Adjust the import path as necessary
//import { HelloClass, HelloFn } from './ls';

export default function App() {
    return (
        <>
            <HelloCC name="Class Component" />
            <HelloFC name="Functional Component" />
        </>
    );
}
