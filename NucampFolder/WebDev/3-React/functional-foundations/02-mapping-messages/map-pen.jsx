// Challenge 1
const numbers = [1, 1, 2, 3, 5];
const numbersAddFive = numbers.map(num => num + 5);
console.log(numbersAddFive); // [6, 6, 7, 8, 10]

// Challenge 2 - adding a colon and a space after each number
// The numbers array is the same as above
// The code has been started for you at line 7
const numbersReformatted = numbers.map(numb => String(numb) + ': ');
console.log(numbersReformatted); // ['1: ', '1: ', '2: ', '3: ', '5: ']

// Challenge 3 - removing the "s" from the end of each word
const words = ["planes", "trains", "automobiles"];
const singularWords = words.map(word => word.slice(0, -1));
// The below line should console.log: ["plane", "train", "automobile"]
console.log(singularWords);

// Challenge 4 - returning an array with just the first letter of each word
// The code has been started for you in line 19
const firstLetters = words.map(word => word[0]);
// The below line should console.log: ["p", "t", "a"]
console.log(firstLetters);

// Bonus:
const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
// The below line should console.log: ["Planes", "Trains", "Automobiles"]
console.log(capitalizedWords);