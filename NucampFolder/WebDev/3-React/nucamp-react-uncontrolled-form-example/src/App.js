import { useRef } from "react";

const Form = () => {
  const inputEl = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log("submitted value:", inputEl.current.value);
    inputEl.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputEl} />
      <button type="submit">Submit</button>
    </form>
  );
};
/* Note this is just a quick example.
   Normally you would want to export the Form component
   from its own file then import it here. */

function App() {
  return <Form />;
}

export default App;
