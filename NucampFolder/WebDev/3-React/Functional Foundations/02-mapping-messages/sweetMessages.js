const messages = [
    'how are you doing?',
    'what are you up to?',
    'would you like to get a bite later',
];

//const sweetMessages = `${messages[0]}, sweetie?`
//const sweetMessages = messages.map(message => `${message}, sweetie?`);
// Array transformations
// imperative style
// Shared mutable variable
// we made a new array and pushed new values into it
// we mutated the array
// const sweetMessages = [];
// for (let i = 0; i < messages.length; i++) {
//     const newMessage = `${messages[i]}, sweetie?`;
//     sweetMessages.push(newMessage);
// }    
// Functional style - describe what you want to do, not how to do it
// we are not mutating the array, we are creating a new one
// we are not using a shared mutable variable
// we are using a function that takes each element and returns a new one
// we are using the map function to transform the array
// we are not using a for loop, we are using a higher order function
// we are not using a shared mutable variable, we are creating a new array
// we are not using a for loop, we are using a higher order function
// The callback function is called for each element in the array
// and returns a new value for that element.
// The map function returns a new array with the transformed values.
// The map function is a higher order function that takes a callback function
// and applies it to each element in the array.
// At each index, the callback function is called with the current element
// and returns a new value for that element.
// The map function is a higher order function that takes a callback function
// and applies it to each element in the array.
// It takes a function as an argument and returns a new array which is the 
// result of applying that function to each element of the original array.
// The callback function can take any number of arguments, but in this case,
// it only takes one argument, which is the current element of the array.
// Map can take 1 to 3 arguments: the current element, the current index, and the array itself.     
// The array will supply our callback function with those three different parameters.
// All three of the variables are available inside the body of the callback function.
const sweetMessages = messages.map(message => `${message}, sweetie?`);
    console.log(sweetMessages);
// const sweetMessages =  [
//     'how are you doing?', sweetie?,
//     'what are you up to?', sweetie?,
//     'would you like to get a bite later, sweetie?',
// ];
