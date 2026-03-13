// This pattern of exporting a function that takes a callback is common in Node.js, 
// and is often used to perform asynchronous operations. In this case, the function 
// simulates an asynchronous operation by using setTimeout to delay the execution of 
// the callback for 2 seconds. If the dimensions of the rectangle are valid (greater 
// than zero), it calls the callback with null as the first argument (indicating no error) 
// and an object containing the perimeter and area methods as the second argument. 
// If the dimensions are invalid, it calls the callback with an Error object as the 
// first argument.

module.exports = (x, y, callback) => {
    if (x <= 0 || y <= 0) {
        callback(new Error(`Rectangle dimensions must be greater than zero. Received: ${x}, ${y}`));
    } else {
        setTimeout(() =>
            callback(null, {
                // The perimeter and area methods are defined as functions that return the 
                // calculated values. This allows the caller to call these methods to get 
                // the perimeter and area of the rectangle. Note that in the comments below
                // the perimeter and area methods were defined as methods of the exports object, 
                // taking x and y as arguments, but in this implementation, they are defined as 
                // functions that use the x and y values from the outer scope, which are the 
                // dimensions of the rectangle. This is a common closure pattern in JavaScript, 
                // where inner functions can access variables from the outer scope, allowing for 
                // more concise code. 
                perimeter: () => 2 * (x + y),
                area: () => x * y
            }),
            2000
        );
    }
};
// It is often fine to use exports instead of module.exports, but not both
// It is also fine to use exports when you are defining a method on the exports object, 
// as in the commented code below.
// Do not use exports when you are defining a function as the value of the entire export 
// instead of as a method of the export, as in the code above.
// exports.perimeter = (x, y) => 2 * (x + y);
// exports.area = (x, y) => x * y;