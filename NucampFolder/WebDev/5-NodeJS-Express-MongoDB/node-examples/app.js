const rect = require('./rectangle');

function solveRect(l, w) {
    console.log(`Solving for rectangle with dimensions: ${l}, ${w}`);

    // The check for valid dimensions is still performed in the solveRect function, but instead of
    // calculating the area and perimeter directly, it calls the rect function, which performs the
    // calculations asynchronously. The rect function takes the dimensions and a callback function as
    // arguments. The callback function is called by the rect function after it has completed the 
    // calculations, and it receives either an error or the rectangle object with the area and 
    // perimeter methods. The solveRect function then logs the area and perimeter if there is no error, 
    // or logs the error message if there is an error. In other words, the call to rect() is asynchronous, 
    // so the code inside the callback function will be executed after the asynchronous operation is complete.
    // This means that the console.log statement at the end of the solveRect function will be executed before 
    // the area and perimeter are calculated and logged, demonstrating the asynchronous nature of the rect 
    // function.

    rect(l, w, (err, rectangle) => {
        if (err) {
            console.log('ERROR:', err.message);
        } else {
            console.log(`Area of rectangle with dimensions ${l}, ${w} is: ${rectangle.area()}`);
            console.log(`Perimeter of rectangle with dimensions ${l}, ${w} is: ${rectangle.perimeter()}`);
        }
    });
    console.log('This statement is logged after the call to rect()');
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(5, -3);
/* (Note: first exported from rectangle.js in the previous section, then imported into app.js in this section)
Update app.js as follows, replacing the entire declaration of rect you added previously with the line below:
const rect = require('./rectangle');
Replaced: const rect = {
perimeter: (x, y) => 2 * (x + y),
area: (x, y) => x * y
};
function solveRect(l, w) {
console.log(`Solving for rectangle with dimensions: ${l}, ${w}`);

if (l <= 0 || w <= 0) {
    console.log(`Rectangle dimensions must be greater than zero. Received: ${l}, ${w}`);
} else {
    console.log(`Area of rectangle: ${rect.area(l, w)}`);
    console.log(`Perimeter of rectangle: ${rect.perimeter(l, w)}`);
}
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(5, -3);
*/