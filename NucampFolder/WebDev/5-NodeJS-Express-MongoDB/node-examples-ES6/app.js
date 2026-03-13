import rect from './rectangle.js';

function solveRect(l, w) {
    console.log(`Solving for rectangle with dimensions: ${l}, ${w}`);

    rect(l, w, (err, rectangle) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log(`Area of rectangle: ${rectangle.area()}`);
            console.log(`Perimeter of rectangle: ${rectangle.perimeter()}`);
        }
    });

    console.log('This statement is after the call to rect().');
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(5, -3);
