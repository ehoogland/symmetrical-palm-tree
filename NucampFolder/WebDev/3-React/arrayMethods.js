// Array.map() review
// const names = ['alice', 'bob', 'charlie'];
// const bigNames = names.map((name) => name.toUpperCase());
// // note that name parameter does not need to be in parentheses 
// // since there's only one parameter
// // ['ALICE', 'BOB', 'CHARLIE']
// console.log('Array.map() review:', bigNames);
// console.log('Original names array:', names);
// 
// Array.filter() and Array.find() basic syntax
// Array.filter() and Array.find() are referred to as selectors or selector functions.
// These are higher-order functions that each take a 
// callback function as an argument. Array.filter() creates 
// a new array with all elements that pass the test implemented 
// by the provided function. 
// const newArray = Array.filter(callbackfn);

// Array.find() returns the value of the first element 
// that passes the test implemented by the provided function.
// const value = Array.find(callbackfn);

const things = [
    {
        id: 0,
        title: 'whiskers on kittens',
        favorite: true,
        points: 97
    },
    {
        id: 1,
        title: 'raindrops on roses',
        favorite: true,
        points: 77
    },
    {
        id: 2,
        title: 'brown paper packages tied up with string',
        favorite: true,
        points: 87
    },
    {
        id: 3,
        title: 'dog bite',
        favorite: false,
        featured: 'true',
        points: 12
    },
    {
        id: 4,
        title: 'bee sting',
        favorite: false,
        points: 6
    }
];
// Create a new const variable named myFavoriteThings. Set the value of this variable to a new array 
// that is created by going through all the items in the things array one by one and only saving to 
// the new array the items that have a truthy value in their favorite property.
// She refers to the callback function as a test function, which is a common convention.
// Functions that return a boolean value are often called test functions. 'predicates' are also a 
// common term.
// const myFavoriteThings0 = things.filter((thing) => thing.favorite === true);
// Alternatively, you can use the shorthand version since the callback function is a single expression.
const myFavoriteThings1 = things.filter((thing) => thing.favorite);
// Since the callback function is a single expression, you can also use the arrow function shorthand syntax.
// const myFavoriteThings2 = things.filter(thing => thing.favorite);
//console.log('myFavoriteThings:', myFavoriteThings2);
// Note that array.filter() does not modify the original array, it creates a new one, but the items returned
// in the new array are references to the same objects in memory as the original array.
// const thingsWithOverFiftyPoints = things.filter(thing => thing.points > 50);
// console.log('thingsWithOverFiftyPoints:', thingsWithOverFiftyPoints);



const selectThingsById = (id) => {
    // Create a new const variable named thingById. Set the value of this variable to the first item in 
    // the things array that has an id property that matches the id parameter passed to the function.
    // Use Array.find() to do this.
    // instead of hardcoding the id, you can pass it as a parameter
    return things.find((thing) => thing.id === id);
};
const selectedThing = selectThingsById(4);
//console.log('selectedThing:', selectedThing);
const isTrueFeatured = things.find(thing => thing.featured);
console.log('isTrueFeatured:', isTrueFeatured);
// you can also just log the first item that has a truthy value in its featured property
// This will return the first item that has a truthy value in its featured property.
// If no item is found, it will return undefined.
// If you want to log the first item that has a truthy value in its featured property
// you can use the following code:
console.log(things.find(thing => thing.featured));
// Using filter to find first item with a truthy value in their featured property
// filter is less efficient since it goes through the entire array
// and creates a new array, then you access the first item in that array.
// find stops as soon as it finds the first match.
// If you want to log the first item that has a truthy value in its featured property
// using filter, you can use the following code:
console.log(things.filter(thing => thing.featured)[0]);