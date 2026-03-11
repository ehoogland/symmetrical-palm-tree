const INSTRUMENT_TYPE_STRING = 0;
const INSTRUMENT_TYPE_PERCUSSION = 1;
const INSTRUMENT_TYPE_WIND = 2;

const instruments = [
  { 
    id: 0,
    name: 'guitar',
    type: INSTRUMENT_TYPE_STRING
  },
  { 
    id: 1,
    name: 'xylophone',
    type: INSTRUMENT_TYPE_PERCUSSION
  },
  {
    id: 2,
    name: 'zither',
    type: INSTRUMENT_TYPE_STRING
  },
  { 
    id: 3,
    name: 'bagpipes',
    type: INSTRUMENT_TYPE_WIND
  },
];
/**
 * In case you want sort() to not mutate the original array, but return a shallow-copied array 
 * like other array methods (e.g., map()) do, use the toSorted() method. 
 * Alternatively, you can do a shallow copy before calling sort(), using the spread syntax or Array.from().
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * In this case, I use the spread syntax inside an array literal to create a shallow copy.
 * @param {Array} objectArray - The array of objects to sort. This array is not mutated.
 * @returns {Array} - The sorted array.
 */
// Challenge 1: sort by name (returns objects)
  const sortItems = (objectArray) => {
    // create a copy with spread inside an array literal to avoid mutating the input
    // sort by name, then map to include the type as a readable string
    return ([...objectArray]
      .sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        return nameA > nameB ? 1 : nameA === nameB ? 0 : -1;
      })
    );
}
console.log(sortItems(instruments));
console.log(instruments);

// Challenge 2: filter by instrument type (returns objects)
const getType = (objectArray, type) => objectArray.filter(item => item.type === type);
console.log(getType(instruments, INSTRUMENT_TYPE_STRING));


// Challenge 3: getNames - returns array of name strings
const getNames = (objectArray) => objectArray.map(item => item.name);
console.log(getNames(instruments));

// Challenge 4: names of stringed instruments
console.log(getNames(getType(instruments, INSTRUMENT_TYPE_STRING)));

