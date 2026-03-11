/*
  {
    color: 'red',
    title: 'Sample title 1',
    tag: 'h1'
  }
*/
function SubHeader(data) {
  return (
    <h1 className="fw-bold" style={{color: data.color}}>
      {data.title}
    </h1>
  )
}

function Func2() {};
function Func3() {};

export default SubHeader; // Implicit Export
// import SubHeader from ...
// import FooBar from SubHeader

export {
  Func2,
  Func3,
  SubHeader
}; // Explicit

// Importing
// import { Func2, Func3 } from './App';
