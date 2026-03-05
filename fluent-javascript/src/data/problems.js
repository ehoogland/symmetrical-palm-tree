/* eslint-disable no-template-curly-in-string */
// problems.js - curated problems used by the app

export const problems = [
  {
    id: 'looping-triangle',
    title: 'Looping an upside-down right triangle',
    difficulty: 'Easy',
    description: `
      <p>In one sugared line, code a <code>for</code> loop that uses slice to make eight calls to <code>console.log</code> to output an upside down right triangle:</p>
      <pre>
********
*******
******
*****
****
***
**
*

</pre><br />
      <p>Keep in mind:</p>
      <ul>
        <li>that you can find a string's length by writing <code>.length</code> after it.</li>
           <li>that syntactic sugar can make your code more concise.</li>
      </ul>
    `,
    starterCode: "// Your code here",
    hints: [
      'You can build the triangle by starting with a full string and removing characters.',
      'The -= operator can be used to remove from a string: str -= "x" removes "x" from str.'
    ],
    solution: `for (let line = '********'; line.length > 0; line = line.slice(0, -1)) console.log(line);
`,
    tags: ['loops', 'strings', 'beginner']
  },
  // New problem: demonstrate early exit with break
  {
    id: 'find-first-match-break',
    title: 'Find first match and stop early using break',
    difficulty: 'Easy',
    description: `
      <p>Refactor a loop so it stops as soon as a matching item is found. This reduces work and makes the intent clear.</p>
      <p>Given an array, find the first element divisible by 7 and print it. Stop scanning the array after the first match.</p>
    `,
    starterCode: `const arr = [3, 5, 8, 14, 21, 28];`,

    hints: [
      'Use a break statement to stop the loop when the first match is found.',
      'Expected output:\n14'
    ],
    solution: `const arr = [3, 5, 8, 14, 21, 28];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 7 === 0) {
    console.log(arr[i]); // prints the first match (14)
    break;               // stop scanning after the first match
  }
}`,
    tags: ['loops', 'arrays', 'break', 'beginner']
  },

  {
    id: 'print-1-to-10-reverse',
    title: 'Print numbers 1 to 10 in reverse',
    difficulty: 'Easy',
    description: `
      <p>Print the numbers from 1 to 10 in reverse order (10 down to 1), each on its own line, using a for loop.</p>
      <p style="line-height:2.5;position:relative;">Use alternative loop constructs <code>for..in</code> or <code>for..of</code> to print the numbers in reverse order.</p>
    `,
  starterCode: "// Your code here",
  // show the novice lozenge next to the Easy badge for this problem
  showNoviceLozenge: true,

    hints: [
      'A for loop with a decrementing counter is the most direct.',
      'You can also build an array and iterate it in reverse.',
      'Remember the loop bounds when counting down.'
    ],
    solution: `// standard for loop\nfor (let i = 10; i >= 1; i--) {\n  console.log(i);\n}`,
    altSolutions: {
      'for-in': `// for..in over an array of length 10 (idx are strings)\nconst arr = Array.from({length: 10});\nfor (const idx in arr) {\n  const num = 10 - Number(idx);\n  console.log(num);\n}`,
      'for-of': `// for..of over an array of numbers\nconst arr = Array.from({length: 10}, (_, i) => 10 - i);\nfor (const num of arr) {\n  console.log(num);\n}`
    },
    altHints: {
      'for-in': [
        "Use an array as the iteration target: const arr = Array.from({length: 10})",
        "for..in iterates indices (as strings). Convert with Number(idx) to compute values."
      ],
      'for-of': [
        "Create the values array explicitly: const arr = Array.from({length: 10}, (_, i) => 10 - i) // [10,9,...,1]",
        "for..of iterates values directly, so you can console.log(num) inside the loop."
      ]
    },
    tags: ['loops', 'numbers', 'beginner']
  },

  {
    id: 'print-element-lengths',
    title: 'Print each array element\'s length',
    difficulty: 'Easy',
    description: `
      <p>Given an array of strings, loop through the array and print the length of each element.</p>
      <pre>let arr = ['hello', 'world', 'JS'];</pre>
    `,
  starterCode: "const arr = ['hello', 'world', 'JS'];\n// Your code here",
  // don't show the extra Novice lozenge for this specific problem
  showNoviceLozenge: false,
    hints: [
      'Use <code>.length</code> on each string to get its length.',
      'for..of is well-suited to iterate array values directly.',
      'for..in iterates indices (as strings) and can be used with arr[idx].length.'
    ],
    solution: `// standard for loop\nconst arr = ['hello', 'world', 'JS'];\nfor (let i = 0; i < arr.length; i++) {\n  console.log(arr[i].length);\n}`,
    altSolutions: {
      'for-in': `// for..in over indices\nconst arr = ['hello', 'world', 'JS'];\nfor (const i in arr) {\n  console.log(arr[i].length);\n}`,
      'for-of': `// for..of over values\nconst arr = ['hello', 'world', 'JS'];\nfor (const s of arr) {\n  console.log(s.length);\n}`
    },
    altHints: {
      'for-in': [
        "Use a const arr line: const arr = ['hello','world','JS']",
        "for..in gives indices ('0','1','2') — use arr[i].length to get lengths."
      ],
      'for-of': [
        "Use a const arr line: const arr = ['hello','world','JS']",
        "for..of iterates values directly — use s.length inside the loop."
      ]
    },
    tags: ['loops', 'arrays', 'strings', 'beginner']
  },

  {
    id: 'print-coordinates-skip-1-1',
  title: 'Print coordinates from (0,0) to (2,2), but skip (1,1)',
    difficulty: 'Novice',
    description: `
      <p>Create a nested loop that prints coordinates from (0,0) to (2,2), skipping (1,1) using <code>continue</code>.</p>
      <p style="line-height:2.5;position:relative;">Break out of the relevant loop when reaching (1,1) using <code>break</code> and a <code>labeled statement</code>.\n
      Display output using a template literal.</p>
    `,
    starterCode: "// Your code here",
    hints: [
  'Do not put coordinates inside of an array.',
      'Use two nested loops: outer loop for i, inner loop for j (0..2).',
      "Expected output:\n(0,0)\n(0,1)\n(0,2)\n(1,0)\n(1,2)\n(2,0)\n(2,1)\n(2,2)",
      'Your solution should skip only the coordinate (1,1) using continue or an explicit if check.',
      "Print each coordinate using <code>console.log('(' + i + ',' + j + ')')</code> or using a template literal: <code>console.log(`(&#36;{i},&#36;{j})`)</code>. Tests accept either format."
    ],
    solution: `for (let i = 0; i <= 2; i++) {
  for (let j = 0; j <= 2; j++) {
    if (i === 1 && j === 1) continue;
    console.log('(' + i + ',' + j + ')');
  }
}`,
    altSolutions: {
      'template-literal': 'for (let i = 0; i < 3; i++) {\n  for (let j = 0; j < 3; j++) {\n    if (i === 1 && j === 1) continue;\n    console.log(`(${i}, ${j})`);\n  }\n}',
      'if-only': 'for (let i = 0; i < 3; i++) {\n  for (let j = 0; j < 3; j++) {\n    if (i === 1 && j === 1) {\n      // skip this coordinate\n    } else {\n      console.log("(" + i + "," + j + ")");\n    }\n  }\n}',
      'labeled-statement': `outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop;
    }
    console.log('(' + i + ',' + j + ')');
  }
}
Labeled break expresses the intent to exit the outer loop clearly and avoids the boolean flag variable. Use labels sparingly — they're less common, but fine when they simplify control flow.`
    },
    tags: ['loops', 'nested-loops', 'beginner']
  }
  ,
  {
    id: 'reflect-break-refactor',
    title: 'Reflect on loop refactoring using break',
    difficulty: 'Easy',
    clickToShowSolution: true,
    description: `
      <p>Reflect on an instance or two where a loop could be refactored using <code>break</code> for improved efficiency and readability. No code entry is required — click the solution to read an example response.</p>
    `,
    starterCode: "",
    solutionIsCode: false,
    solutionIsHtml: true,
    solution: `
      <h4 style="color:#000">Key takeaway</h4>
      <p>Prefer early exits to reduce work and make control flow explicit.</p>
      <h4 style="color:#000">Code examples</h4>
      <h5>Before (flag variable)</h5>
      <pre><code>function findFirstWithFlag(arr, predicate) {
  let found = undefined;
  let foundFlag = false;
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {
      found = arr[i];
      foundFlag = true;
    }
    // continue looping even after found
  }
  return foundFlag ? found : undefined;
}</code></pre>
      <h5>After (use break / early return)</h5>
      <pre><code>function findFirst(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {
      return arr[i]; // immediate return stops the loop
    }
  }
  return undefined;
}</code></pre>
      <h5>Nested loops — before (flag)</h5>
      <pre><code>let found = false;
for (let i = 0; i < rows.length; i++) {
  for (let j = 0; j < cols.length; j++) {
    if (test(rows[i], cols[j])) {
      found = true;
      break;
    }
  }
  if (found) break;
}</code></pre>
      <h5>Nested loops — after (labeled break)</h5>
      <pre><code>outer: for (let i = 0; i < rows.length; i++) {
  for (let j = 0; j < cols.length; j++) {
    if (test(rows[i], cols[j])) {
      break outer; // immediately exit both loops
    }
  }
}</code></pre>
    `,
    
    tags: ['concept', 'reflection']
  }
  ,
  
  {
    id: 'foobar',
    title: 'FooBar',
    difficulty: 'Easy',
    description: `
      <p>Log the numbers from 1 to 100 with the following rules:</p>
      <ol>
        <li>If a number is divisible by 3, log <code>Foo</code>.</li>
        <li>If a number is divisible by 5 but not 3, log <code>Bar</code>.</li>
        <li>If a number is divisible by both 3 and 5, log <code>FooBar</code>.</li>
        <li>Otherwise, log the number itself.</li>
      </ol>
      <p>You <i>earn a stripe</i> if you can complete all three of these:</p>
      <ol>
        <li>The <strong>naive</strong> solution uses if / else if (branching) and plenty of logs.</li>
        <li>The <strong>elegant</strong> string-building approach requires only two cases.</li>
        <li>The <strong>terse</strong> solution uses just one line of code.</li>
      </ol>
    `,
    starterCode: `// Print 1..100 according to the FooBar rules
`,
  // display Tech5 stripe under the primary stripe for this problem
  showTech5UnderPrimary: true,
    hints: [
       `Use the modulo operator (%) to check divisibility.`,
      `If n is divisible by both 3 and 5, make sure to think about how to avoid missing it (standard solution).`,
      'To be clever, create an empty string for each iteration and append "Foo" when n % 3 === 0 and "Bar" when n % 5 === 0.',
      'After building the string, use `console.log(output || n)` to print the word(s) or the number if the word is empty (clever solution and ternary).',
      'You can also check divisibility with if-statements in the order shown — building the string keeps the logic simple and naturally handles the case in which both conditions are true.'
    ],
    // canonical: standard branching solution (clear, explicit)
    solution: `for (let n = 1; n <= 100; n++) {
  if (n % 3 === 0 && n % 5 === 0) {
    console.log("FooBar");
  } else if (n % 3 === 0) {
    console.log("Foo");
  } else if (n % 5 === 0) {
    console.log("Bar");
  } else {
    console.log(n);
  }
}`,
    // alternatives: clever string-building and ternary string-building variants
    altSolutions: {
      'elegant': `for (let n = 1; n <= 100; n++) {
  let output = "";
  if (n % 3 == 0) output += "Foo";
  if (n % 5 == 0) output += "Bar";
  console.log(output || n);
}`,
'ternary': `for (let n = 1; n <= 100; n++) console.log(n % 15 === 0 ? 'FooBar' : (n % 3 === 0 ? 'Foo' : (n % 5 === 0 ? 'Bar' : n)));
`,  
    },
    tags: ['loops', 'numbers', 'beginner']
  }, // end FooBar problem
  {
    id: 'checkerboard',
    title: 'Checkerboard',
    difficulty: 'Novice',
    description: `
      <p>Write a program that creates a checkerboard pattern. At each position of the grid there is either a space or a "#" character. 
      Use <code>horizontalSpaces</code> and <code>verticalSpaces</code> bindings to control the width and height.</p>
      <pre>
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
</pre>
    `,
    starterCode: `// Your code here`,
    hints: [
      'Use nested loops: outer for rows (horizontal), inner for columns (vertical).',
      'Use (row + col) % 2 to alternate between space and #.',
      'Append a <code>\\n</code> at the end of each row.'
    ],
    // no secondary tech badge for this problem; keep the default primary stripe
    solution: `const horizontalSpaces = 8;
const verticalSpaces = 8;
let board = '';
for (let row = 0; row < horizontalSpaces; row++) {
  for (let col = 0; col < verticalSpaces; col++) {
    board += (row + col) % 2 === 0 ? ' ' : '#';
  }
  board += '\\n';
}
console.log(board);
`,
    tags: ['loops', 'strings', 'beginner', 'novice']
  },
  {
    id: 'recursive-is-even',
    title: 'Recursion: Even or Odd',
    difficulty: 'Novice',
    description: `
      <p>You have probably used <code>%</code> (the remainder operator) and modulo division (<code>n % 2</code>) 
      to test whether a number is even or odd. Try another way to determine whether a positive whole number is 
      even or odd by drafting a recursive function with the following rules:</p>
      <ul>
        <li>Zero is even.</li>
        <li>One is odd.</li>
        <li>For any other number N, its evenness is the same as N - 2.</li>
        <li>Test using at least one negative number.</li>
        <li> Use <code>const isEven = ...</code></li> to define the function binding.</li>
      </ul>
    
    `,
    hint: `
      <p><strong>Hint 1:</strong> Start with the base cases: what should <code>isEven(0)</code> and <code>isEven(1)</code> return?</p>
      <p><strong>Hint 2:</strong> For any other number, you need to recursively call <code>isEven(n - 2)</code> and return its result.</p>
      <p><strong>Hint 3:</strong> The function will fail on negative numbers because it keeps subtracting 2 and never reaches 0 or 1. You need to handle negative numbers by converting them to positive first. Try using <code>Math.abs()</code> or checking <code>if (n < 0)</code>.</p>
    `,
    starterCode: `/**
 * Determines if a number is even using recursive definition
 * @param {number} n - A whole number to test
 * @returns {boolean} - True if even, false if odd
 */
const isEven = (n) => {
  // Your code here
}

console.log(isEven(0));
// → true
console.log(isEven(1));
// → false
console.log(isEven(-1));
// → false
console.log(isEven(2));
// → true
`,
    solution: `/**
 * Determines if a number is even using recursive definition:
 * - Zero is even
 * - One is odd
 * - For any other number N, its evenness is the same as N - 2
 * @param {number} n - A whole number to test
 * @returns {boolean} - True if even, false if odd
 */
const isEven = (n) => {
  if (n === 0) return true;   // Base case: zero is even
  if (n === 1) return false;  // Base case: one is odd
  
  // Handle negative numbers by converting to positive
  if (n < 0) return isEven(-n);
  
  // Recursive case: check N - 2
  return isEven(n - 2);
}

console.log(isEven(0));

console.log(isEven(1));
// → false
console.log(isEven(-1));
// → false
console.log(isEven(2));
// → true
`,
    tests: [
      { input: 'isEven(0)', expected: 'true' },
      { input: 'isEven(1)', expected: 'false' },
      { input: 'isEven(2)', expected: 'true' },
      { input: 'isEven(-1)', expected: 'false' }
    ],
    altSolutions: {
      'using-math-abs': `/**
 * Alternative approach using Math.abs at the start
 * @param {number} n - A whole number to test
 * @returns {boolean} - True if even, false if odd
 */
const isEven = (n) => {
  n = Math.abs(n);  // Convert to positive at the start
  if (n === 0) return true;
  if (n === 1) return false;
  return isEven(n - 2);
}

console.log(isEven(0));
console.log(isEven(1));
console.log(isEven(-1));
console.log(isEven(-2));
`,
      'ternary': `/**
 * Concise ternary approach with Math.abs applied after subtraction
 * @param {number} n - A whole number to test
 * @returns {boolean} - True if even, false if odd
 */
const isEven = (n) => {
  return n === 0 ? true : n === 1 ? false : isEven(Math.abs(n - 2));
}

console.log(isEven(0));
console.log(isEven(1));
console.log(isEven(-1));
console.log(isEven(2));
`,

    },
    altHints: {
      'using-math-abs': [
        "Use Math.abs at the start to convert negative numbers to positive",
        "This simplifies the recursive logic by ensuring n is always non-negative",
        "The rest of the function remains the same as the canonical solution"
      ],
      'ternary': [
        "Use nested ternary operators to handle all three cases in one expression",
        "Apply Math.abs to the result of (n - 2), not to n first",
        "This ensures negative numbers are converted to positive after subtraction"
      ]
    },
    tags: ['recursion', 'functions', 'base-cases', 'novice']
  },
  {
    id: 'iseven-speed-test',
    title: 'Speed Test: isEven Solutions',
    difficulty: 'Novice',
    description: `
      <p>Now that you've seen different approaches to <code>isEven</code>, let's benchmark them!</p>
      <p><strong>Four Approaches:</strong></p>
      <ol>
        <li><strong>Conditional (if statements):</strong> Check for negatives only when needed</li>
        <li><strong>Math.abs at start:</strong> Convert to positive upfront, then recurse</li>
        <li><strong>Ternary with ===:</strong> Strict equality one-liner</li>
        <li><strong>Ternary with ==:</strong> Loose equality (Eloquent JavaScript style)</li>
      </ol>
      <p>Run the speed test code below to see which is fastest. After running, answer these reflection questions:</p>
      <ol>
        <li>Why is Solution 1 (conditional) the fastest?</li>
        <li>Why is Solution 2 (Math.abs at start) the slowest?</li>
        <li>Which would you use in production and why?</li>
        <li>Which gets the most "cool points" 🔥 and why?</li>
        <li>Is there a performance difference between == and === in the ternary?</li>
      </ol>
      <p><strong>Expected Results:</strong></p>
      <ul>
        <li>Solution 1 (Conditional): ⚡ <strong>~480ms</strong> - Fastest (baseline)</li>
        <li>Solution 2 (Math.abs at start): 🐌 <strong>~840ms (~74% slower)</strong> - Slowest</li>
        <li>Solution 3 (Ternary ===): 🥈 <strong>~550ms (~14% slower)</strong> - Cool factor</li>
        <li>Solution 4 (Ternary ==): 🤔 <strong>~550ms (~14% slower)</strong> - Textbook style</li>
      </ul>
      <p><strong>Cool Points Ranking:</strong></p>
      <ul>
        <li>🔥🔥🔥🔥🔥 Solution 3/4 (Ternary) - Code golf champion! Only ~14% slower but infinite style points!</li>
        <li>🔥🔥🔥 Solution 2 (Math.abs) - Elegant and clever, but performance penalty is steep</li>
        <li>🔥 Solution 1 (Conditional) - Fastest and most readable, but boring 😴</li>
      </ul>
    `,
    hint: `
      <p><strong>Hint 1:</strong> Solution 1 only checks negatives ONCE at the start, then all recursive calls are positive.</p>
      <p><strong>Hint 2:</strong> Solution 2 mutates n with Math.abs on EVERY recursive call, even for already-positive numbers.</p>
      <p><strong>Hint 3:</strong> Solution 3 calls Math.abs(n - 2) on every recursion, adding overhead.</p>
      <p><strong>Hint 4:</strong> The fastest code isn't always the fanciest! Production code balances speed, readability, and maintainability.</p>
      <p><strong>Hint 5:</strong> Cool points are for style - the ternary is like doing a kickflip while solving a Rubik's cube! �</p>
    `,
    starterCode: `// Solution 1: Conditional (if statements)
const isEven1 = (n) => {
  if (n === 0) return true;
  if (n === 1) return false;
  if (n < 0) return isEven1(-n);
  return isEven1(n - 2);
}

// Solution 2: Math.abs at start
const isEven2 = (n) => {
  n = Math.abs(n);
  if (n === 0) return true;
  if (n === 1) return false;
  return isEven2(n - 2);
}

// Solution 3: Ternary with ===
const isEven3 = (n) => {
  return n === 0 ? true : n === 1 ? false : isEven3(Math.abs(n - 2));
}

// Solution 4: Ternary with ==
const isEven4 = (n) => {
  return n == 0 ? true : n == 1 ? false : isEven4(Math.abs(n - 2));
}

// Test numbers
const testNumbers = [50, 75, -1, 0, 1, 100, -50, 999];
const iterations = 100000;

// Benchmark Solution 1
let start1 = Date.now();
for (let i = 0; i < iterations; i++) {
  testNumbers.forEach(n => isEven1(n));
}
let time1 = Date.now() - start1;
console.log(\`Solution 1 (Conditional): \${time1}ms\`);

// Benchmark Solution 2
let start2 = Date.now();
for (let i = 0; i < iterations; i++) {
  testNumbers.forEach(n => isEven2(n));
}
let time2 = Date.now() - start2;
let percent2 = Math.round(((time2 - time1) / time1) * 100);
console.log(\`Solution 2 (Math.abs at start): \${time2}ms (\${percent2}% slower)\`);

// Benchmark Solution 3
let start3 = Date.now();
for (let i = 0; i < iterations; i++) {
  testNumbers.forEach(n => isEven3(n));
}
let time3 = Date.now() - start3;
let percent3 = Math.round(((time3 - time1) / time1) * 100);
console.log(\`Solution 3 (Ternary ===): \${time3}ms (\${percent3}% slower)\`);

// Benchmark Solution 4
let start4 = Date.now();
for (let i = 0; i < iterations; i++) {
  testNumbers.forEach(n => isEven4(n));
}
let time4 = Date.now() - start4;
let percent4 = Math.round(((time4 - time1) / time1) * 100);
let diff34 = ((time3 - time4) / time4 * 100).toFixed(1);
console.log(\`Solution 4 (Ternary ==): \${time4}ms (\${percent4}% slower)\`);
console.log(\`\nComparison: === is \${diff34}% slower than ==\`);

// Your reflection answers here:
// Question 1 - Why is Solution 1 fastest?
// Answer:

// Question 2 - Why is Solution 2 slowest?
// Answer:

// Question 3 - Which for production and why?
// Answer:

// Question 4 - Which gets cool points and why?
// Answer:

// Question 5 - Is there a performance difference between == and ===?
// Answer:`,
    solution: `// Solution 1: Conditional (if statements)
const isEven1 = (n) => {
  if (n === 0) return true;
  if (n === 1) return false;
  if (n < 0) return isEven1(-n);
  return isEven1(n - 2);
}

// Solution 2: Math.abs at start
const isEven2 = (n) => {
  n = Math.abs(n);
  if (n === 0) return true;
  if (n === 1) return false;
  return isEven2(n - 2);
}

// Solution 3: Ternary with ===
const isEven3 = (n) => {
  return n === 0 ? true : n === 1 ? false : isEven3(Math.abs(n - 2));
}

// Solution 4: Ternary with == (as in Eloquent JavaScript)
const isEven4 = (n) => {
  return n == 0 ? true : n == 1 ? false : isEven4(Math.abs(n - 2));
}

// Test numbers
const testNumbers = [50, 75, -1, 0, 1, 100, -50, 999];
const iterations = 100000;

// Benchmark Solution 1
let start1 = Date.now();
for (let i = 0; i < iterations; i++) {
  testNumbers.forEach(n => isEven1(n));
}
let time1 = Date.now() - start1;
console.log(\`Solution 1 (Conditional): \${time1}ms\`);

// Benchmark Solution 2
let start2 = Date.now();
for (let i = 0; i < iterations; i++) {
  testNumbers.forEach(n => isEven2(n));
}
let time2 = Date.now() - start2;
let percent2 = Math.round(((time2 - time1) / time1) * 100);
console.log(\`Solution 2 (Math.abs at start): \${time2}ms (\${percent2}% slower)\`);

// Benchmark Solution 3
let start3 = Date.now();
for (let i = 0; i < iterations; i++) {
  testNumbers.forEach(n => isEven3(n));
}
let time3 = Date.now() - start3;
let percent3 = Math.round(((time3 - time1) / time1) * 100);
console.log(\`Solution 3 (Ternary ===): \${time3}ms (\${percent3}% slower)\`);

// Benchmark Solution 4
let start4 = Date.now();
for (let i = 0; i < iterations; i++) {
  testNumbers.forEach(n => isEven4(n));
}
let time4 = Date.now() - start4;
let percent4 = Math.round(((time4 - time1) / time1) * 100);
let diff34 = ((time3 - time4) / time4 * 100).toFixed(1);
console.log(\`Solution 4 (Ternary ==): \${time4}ms (\${percent4}% slower)\`);
console.log(\`\nComparison: === is \${diff34}% slower than ==\`);

console.log('\\n--- Reflection Answers ---\\n');

// Question 1 - Why is Solution 1 fastest?
// Answer: Solution 1 only checks for negatives ONCE at the start.
// After the first call converts a negative to positive (if needed),
// all subsequent recursive calls work with positive numbers only.
// This means no Math.abs overhead in the recursion chain.

// Question 2 - Why is Solution 2 slowest?
// Answer: Solution 2 calls Math.abs on EVERY recursive call, even though
// the number is already positive after the first call. This means
// unnecessary Math.abs operations on every single recursive step,
// making it ~74% slower than Solution 1 (~840ms vs ~484ms).

// Question 3 - Which for production and why?
// Answer: Solution 1 (conditional) is best for production because:
// - It's the fastest (baseline performance)
// - It's the most readable and self-documenting
// - The explicit negative check makes the intent clear
// - It's maintainable and easy to debug
// - Senior devs write code like this!

// Question 4 - Which gets cool points and why?
// Answer: Solutions 3 & 4 (ternary) get the most cool points 🔥🔥🔥🔥🔥 because:
// - They're one-liner recursive ternaries - looks like code golf!
// - The Math.abs(n - 2) trick is clever and non-obvious
// - They have the "wait, that actually works?!" factor
// - Perfect for impressing at hackathons or code reviews
// - Like doing a kickflip while solving a Rubik's cube!
// - And they're only ~14% slower than Solution 1 (~551ms vs ~484ms)
// The paradox: Fastest code = boring ✅ but Coolest code = ternary flex 💪✨

// Question 5 - Is there a performance difference between == and ===?
// Answer: YES, but it's TINY! === is about 0.5% slower than == (~3ms difference).
// With 100,000 iterations: == runs at ~547ms, === at ~550ms.
// That's a 0.5% performance penalty for type safety.
// In real-world code, this difference is negligible - you'd never notice it.
// The benefits of === (strict equality, no type coercion bugs) far outweigh
// the microscopic performance cost. Always use === in production code!`,
    tests: [],
    tags: ['recursion', 'performance', 'benchmarking', 'reflection', 'novice']
  },
  {
    id: 'assignment-operators',
    title: 'Compound and Logical Assignment Operators',
    difficulty: 'Easy',
    starterCode: `let bonusPoints = 100;
let multiplier = 3;
let userState = null;

// Your code here

console.log('Bonus Points:', bonusPoints);
console.log('Multiplier:', multiplier);
console.log('User State:', userState);`,
    hints: [
      'Use += to add a value to an existing variable.',
      'Chain operations: first use *= to multiply, then /= to divide.',
      'Use ??= (nullish coalescing assignment) to assign only if the variable is null or undefined.',
      'Expected output:\nBonus Points: 150\nMultiplier: 6\nUser State: logged-in'
    ],
    solution: `let bonusPoints = 100;
let multiplier = 3;
let userState = null;

// Task 1: Add 50 to bonusPoints
bonusPoints += 50;

// Task 2: Multiply by 8, then divide by 4
multiplier *= 8;
multiplier /= 4;

// Task 3: Assign "logged-in" only if userState is null
userState ??= "logged-in";

console.log('Bonus Points:', bonusPoints);
console.log('Multiplier:', multiplier);
console.log('User State:', userState);

/**
 * JSDoc Explanation: Nullish Coalescing Assignment (??=)
 *
 * @description The ??= operator assigns a value only if the left operand is nullish 
 *              (null or undefined)
 * @example
 * let value = null;
 * value ??= "default";     // assigns "default" because value is null
 * console.log(value);      // "default"
 * 
 * let existing = "current";
 * existing ??= "default";  // does NOT assign because existing is not nullish
 * console.log(existing);   // "current"
 * 
 * @note Different from ||= which assigns for any falsy value (0, "", false, etc.)
 * @note ??= only cares about null and undefined, not other falsy values
 */`,
    altSolutions: {
      'chained-operations': `let bonusPoints = 100;
let multiplier = 3;
let userState = null;

bonusPoints += 50;
multiplier = multiplier * 8 / 4; // equivalent to *= 8 then /= 4
userState ??= "logged-in";

console.log('Bonus Points:', bonusPoints);
console.log('Multiplier:', multiplier);
console.log('User State:', userState);

/**
 * JSDoc Explanation: Chained Mathematical Operations
 *
 * @description Combining multiple arithmetic operations in a single expression
 * @example
 * let value = 5;
 * value = value * 8 / 4;  // Same as: value *= 8; value /= 4;
 * console.log(value);     // 10 (5 * 8 = 40, then 40 / 4 = 10)
 * 
 * // Order of operations matters:
 * let a = 10;
 * a = a * 2 + 3;     // Result: 23 (multiply first, then add)
 * let b = 10;
 * b = (b + 3) * 2;   // Result: 26 (parentheses change order)
 * 
 * @note Mathematical simplification: 8/4 = 2, so multiplying by 8 then 
 *       dividing by 4 equals multiplying by 2
 */`,
      'alternative-logical': `let bonusPoints = 100;
let multiplier = 3;
let userState = null;

bonusPoints += 50;
multiplier *= 2; // 8/4 = 2, so just multiply by 2
userState = userState ?? "logged-in"; // explicit nullish coalescing

console.log('Bonus Points:', bonusPoints);
console.log('Multiplier:', multiplier);
console.log('User State:', userState);

/**
 * JSDoc Explanation: Explicit Nullish Coalescing vs Assignment Operator
 *
 * @description Comparing ??= (assignment) with ?? (coalescing) operator
 * @example
 * // Using nullish coalescing assignment (??=):
 * let status = null;
 * status ??= "default";  // Assigns "default" if status is null/undefined
 * 
 * // Using explicit nullish coalescing (??):
 * let status2 = null;
 * status2 = status2 ?? "default";  // Equivalent to above, but more verbose
 * 
 * // Both handle edge cases the same way:
 * let count = 0;
 * count ??= 5;           // count remains 0 (not nullish)
 * count = count ?? 5;    // count remains 0 (not nullish)
 * 
 * @note ??= is shorthand syntax, ?? gives more control over assignment
 * @note Both only trigger for null/undefined, not for 0, false, or ""
 */`
    },
    altHints: {
      'chained-operations': [
        "You can combine the multiplication and division into one expression: multiplier * 8 / 4",
        "This is mathematically equivalent to multiplying by 2 (since 8/4 = 2)"
      ],
      'alternative-logical': [
        "Instead of ??=, you can use explicit nullish coalescing: userState = userState ?? 'logged-in'",
        "Notice that 8 divided by 4 equals 2, so you could just multiply by 2 directly"
      ]
    },
    tags: ['operators', 'assignment', 'compound', 'logical', 'beginner']
  },
  {
    id: 'rewrite-if-else-with-switch',
    title: 'Rewrite if-else chains with switch',
    difficulty: 'Easy',
    description: `
      <p>Rewrite the following if-else chain using a <code>switch</code> statement. The logic should remain exactly the same.</p>
      <p>Original code to convert:</p>
      <pre>let fruit = 'banana';
if (fruit === 'apple') {
  console.log("It's an apple.");
} else if (fruit === 'banana') {
  console.log("It's a banana.");
} else {
  console.log("Fruit type unknown.");
}</pre>
    `,
    starterCode: `let fruit = 'banana';
// Rewrite the if-else chain below using switch

// Your code here`,
    hints: [
      'Use switch (fruit) to check the value of the fruit variable.',
      'Each case should handle one specific fruit type.',
      'Use the default case for the "unknown" scenario.',
      'Don\'t forget break statements to prevent fall-through.',
      'Expected output:\nIt\'s a banana.'
    ],
    solution: `let fruit = 'banana';

switch (fruit) {
  case 'apple':
    console.log("It's an apple.");
    break;
  case 'banana':
    console.log("It's a banana.");
    break;
  default:
    console.log("Fruit type unknown.");
}`,
    altSolutions: {
      'with-orange': `let fruit = 'orange';

switch (fruit) {
  case 'apple':
    console.log("It's an apple.");
    break;
  case 'banana':
    console.log("It's a banana.");
    break;
  case 'orange':
    console.log("It's an orange.");
    break;
  default:
    console.log("Fruit type unknown.");
}`,
      'multiple-cases': `let fruit = 'banana';

switch (fruit) {
  case 'apple':
  case 'red-apple':
    console.log("It's an apple.");
    break;
  case 'banana':
  case 'yellow-banana':
    console.log("It's a banana.");
    break;
  default:
    console.log("Fruit type unknown.");
}`,
      'fall-through': `let fruit = 'apple';

switch (fruit) {
  case 'apple':
    console.log("It's an apple.");
    // fall through to log "citrus or sweet fruit"
  case 'orange':
    console.log("Citrus or sweet fruit detected!");
    break;
  case 'banana':
    console.log("It's a banana.");
    break;
  default:
    console.log("Fruit type unknown.");
}

// Note: Since fruit = 'apple', both "It's an apple." and 
// "Citrus or sweet fruit detected!" will be logged due to fall-through`
    },
    altHints: {
      'with-orange': [
        "Add an additional case for 'orange' fruit type",
        "Each case should have its own break statement"
      ],
      'multiple-cases': [
        "Use multiple case labels for the same outcome (e.g., 'apple' and 'red-apple')",
        "Cases without break statements will fall through to the next case"
      ],
      'fall-through': [
        "Intentionally omit the break statement in the 'apple' case to demonstrate fall-through",
        "Add a comment like '// fall through' to make the intention clear",
        "When fruit = 'apple', both the apple message and the citrus message will be logged"
      ]
    },
    tags: ['conditionals', 'switch', 'control-flow', 'beginner']
  },
  {
    id: 'consider-code-readability',
    title: 'Consider: Code readability vs. performance',
    difficulty: 'Novice',
    clickToShowSolution: true,
    description: `
      <p>Consider the trade-offs between code readability and performance optimization. When should you prioritize one over the other?</p>
      <p>Think about scenarios where clear, verbose code might be better than optimized but complex code, and vice versa.</p>
      <p style="margin-top: 1rem; color: #6c757d; font-style: italic;">
        No code entry required — click <strong>Show Solution</strong> to explore different perspectives on this fundamental development question.
      </p>
    `,
    starterCode: "",
    solutionIsCode: false,
    solutionIsHtml: true,
    solution: `
      <h4 style="color:#000">Key Principle</h4>
      <p><strong>Optimize for readability first, performance second</strong> — unless you have measurable performance requirements.</p>
      
      <h4 style="color:#000">When to prioritize readability</h4>
      <ul>
        <li><strong>Team collaboration:</strong> Code is read 10x more than it's written</li>
        <li><strong>Maintenance phase:</strong> Future developers (including yourself) need to understand the logic</li>
        <li><strong>Business logic:</strong> Complex algorithms benefit from clear variable names and comments</li>
        <li><strong>Debugging:</strong> Readable code makes finding bugs much easier</li>
      </ul>

      <h4 style="color:#000">When performance might take priority</h4>
      <ul>
        <li><strong>Hot paths:</strong> Code that runs thousands of times per second</li>
        <li><strong>Resource constraints:</strong> Mobile apps, embedded systems, real-time applications</li>
        <li><strong>Proven bottlenecks:</strong> Profiler data shows this specific code is the problem</li>
        <li><strong>User experience:</strong> Noticeable lag in UI interactions</li>
      </ul>

      <h4 style="color:#000">Best practices</h4>
      <ol>
        <li><strong>Measure first:</strong> Use profilers to identify actual bottlenecks</li>
        <li><strong>Comment optimized code:</strong> Explain why you chose performance over clarity</li>
        <li><strong>Consider both:</strong> Sometimes you can achieve both readability and performance</li>
        <li><strong>Document trade-offs:</strong> Explain the reasoning in code comments or documentation</li>
      </ol>

      <h4 style="color:#000">Code example</h4>
      <h5>Readable version:</h5>
      <pre><code>function calculateUserScore(activities) {
  let totalScore = 0;
  for (const activity of activities) {
    if (activity.isCompleted && activity.points > 0) {
      totalScore += activity.points;
    }
  }
  return totalScore;
}</code></pre>

      <h5>Optimized version (if activities array is huge):</h5>
      <pre><code>function calculateUserScore(activities) {
  // Optimized for large datasets - using reduce with early filtering
  return activities
    .filter(a => a.isCompleted && a.points > 0)
    .reduce((sum, a) => sum + a.points, 0);
}</code></pre>

      <h5>Best of both:</h5>
      <pre><code>function calculateUserScore(activities) {
  // Sum points from completed activities with positive scores
  return activities
    .filter(activity => activity.isCompleted && activity.points > 0)
    .reduce((totalScore, activity) => totalScore + activity.points, 0);
}</code></pre>
    `,
    tags: ['concept', 'reflection', 'best-practices', 'development']
  },
  {
    id: 'understand-unix-command-pipeline',
    title: 'Understanding Unix command pipelines',
    difficulty: 'Novice',
    clickToShowSolution: true,
    description: `
      <p>Let's break down a common development command that uses Unix pipes and process management.</p>
      <p>The command: <code>lsof -ti:62059 | xargs kill -9</code></p>
      <p style="margin-top: 1rem; color: #6c757d; font-style: italic;">
        No code entry required — click <strong>Show Solution</strong> to see a step-by-step explanation of how this command works.
      </p>
    `,
    starterCode: "",
    solutionIsCode: false,
    solutionIsHtml: true,
    solution: `
      <h4 style="color:#000">Command breakdown</h4>
      <pre><code>lsof -ti:62059 | xargs kill -9</code></pre>

      <h4 style="color:#000">Part 1: lsof -ti:62059</h4>
      <ul>
        <li><strong>lsof</strong> = list open files (shows processes using files/ports)</li>
        <li><strong>-t</strong> = output only process IDs (PIDs), not full details</li>
        <li><strong>-i:62059</strong> = show processes using internet connection on port 62059</li>
        <li><strong>Result:</strong> prints just the PID numbers of processes using port 62059</li>
      </ul>

      <h4 style="color:#000">Part 2: | (pipe)</h4>
      <p>Takes output from the left command and feeds it as input to the right command</p>

      <h4 style="color:#000">Part 3: xargs kill -9</h4>
      <ul>
        <li><strong>xargs</strong> = takes input and passes it as arguments to another command</li>
        <li><strong>kill -9</strong> = forcefully terminate processes</li>
        <li><strong>-9</strong> = SIGKILL (strongest kill signal, cannot be ignored)</li>
      </ul>

      <h4 style="color:#000">What it does:</h4>
      <ol>
        <li>Finds all processes using port 62059</li>
        <li>Forcefully kills them</li>
      </ol>

      <h4 style="color:#000">Example flow:</h4>
      <pre><code># Step 1: lsof finds PIDs
lsof -ti:62059  # outputs: 12345
                #          67890

# Step 2: xargs converts to arguments
xargs kill -9   # becomes: kill -9 12345 67890</code></pre>

      <h4 style="color:#000">Why we use it:</h4>
      <ul>
        <li>Cleans up any lingering Python HTTP servers on port 62059</li>
        <li>Ensures we can start a fresh server without port already in use errors</li>
        <li>The -9 flag ensures processes are terminated even if they're stuck</li>
        <li>This is a common pattern for cleaning up development servers before restarting them</li>
      </ul>

      <h4 style="color:#000">Alternative approaches:</h4>
      <pre><code># More cautious approach (SIGTERM first)
lsof -ti:62059 | xargs kill

# Kill specific process if you know the PID
kill -9 12345

# Find and kill by process name
pkill -f python3</code></pre>
    `,
    tags: ['concept', 'unix', 'command-line', 'development', 'processes']
  },
  {
    id: 'nodejs-process-management',
    title: 'Node.js process management equivalent',
    difficulty: 'Novice',
    clickToShowSolution: true,
    description: `
      <p>Learn how to achieve similar process management in Node.js compared to the Unix command pipeline.</p>
      <p>Node.js equivalent of: <code>lsof -ti:62059 | xargs kill -9</code></p>
      <p style="margin-top: 1rem; color: #6c757d; font-style: italic;">
        No code entry required — click <strong>Show Solution</strong> to see Node.js approaches for process management.
      </p>
    `,
    starterCode: "",
    solutionIsCode: false,
    solutionIsHtml: true,
    solution: `
      <h4 style="color:#000">Node.js approaches</h4>
      
      <h4 style="color:#000">Method 1: Using child_process.exec</h4>
      <pre><code>const { exec } = require('child_process');

// Execute the Unix command directly from Node.js
exec('lsof -ti:62059 | xargs kill -9', (error, stdout, stderr) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  if (stderr) {
    console.error('Stderr:', stderr);
    return;
  }
  console.log('Processes killed successfully');
});</code></pre>

      <h4 style="color:#000">Method 2: Using child_process.spawn for more control</h4>
      <pre><code>const { spawn } = require('child_process');

// Step 1: Find processes using port 62059
const lsof = spawn('lsof', ['-ti:62059']);
let pids = '';

lsof.stdout.on('data', (data) => {
  pids += data.toString();
});

lsof.on('close', (code) => {
  if (code === 0 && pids.trim()) {
    // Step 2: Kill the processes
    const pidArray = pids.trim().split('\\n').filter(pid => pid);
    
    pidArray.forEach(pid => {
      const kill = spawn('kill', ['-9', pid]);
      kill.on('close', (killCode) => {
        console.log('Killed process', pid, 'with code', killCode);
      });
    });
  }
});</code></pre>

      <h4 style="color:#000">Method 3: Using Node.js built-in process.kill</h4>
      <pre><code>const { exec } = require('child_process');

// Find PIDs first
exec('lsof -ti:62059', (error, stdout, stderr) => {
  if (error || stderr) {
    console.error('No processes found on port 62059');
    return;
  }
  
  const pids = stdout.trim().split('\\n').filter(pid => pid);
  
  pids.forEach(pid => {
    try {
      // Use Node.js built-in process.kill
      process.kill(parseInt(pid), 'SIGKILL');
      console.log('Killed process:', pid);
    } catch (err) {
      console.error('Failed to kill process', pid, ':', err.message);
    }
  });
});</code></pre>

      <h4 style="color:#000">Method 4: Cross-platform approach using third-party packages</h4>
      <pre><code>// npm install find-process kill-port
const find = require('find-process');
const kill = require('kill-port');

// Option A: Using find-process
find('port', 62059)
  .then(list => {
    list.forEach(proc => {
      console.log('Found process:', proc.pid, proc.name);
      try {
        process.kill(proc.pid, 'SIGKILL');
        console.log('Killed process:', proc.pid);
      } catch (err) {
        console.error('Failed to kill:', err.message);
      }
    });
  })
  .catch(err => console.error('Error finding processes:', err));

// Option B: Using kill-port (simpler)
kill(62059)
  .then(() => console.log('Port 62059 is now free'))
  .catch(err => console.error('Error:', err));</code></pre>

      <h4 style="color:#000">Key differences:</h4>
      <ul>
        <li><strong>Unix pipeline:</strong> Streams data between commands automatically</li>
        <li><strong>Node.js:</strong> Requires explicit handling of data flow and error cases</li>
        <li><strong>Cross-platform:</strong> Node.js solutions can work on Windows, Mac, and Linux</li>
        <li><strong>Error handling:</strong> Node.js provides more granular error handling</li>
        <li><strong>Async nature:</strong> Node.js operations are naturally asynchronous</li>
      </ul>

      <h4 style="color:#000">When to use each:</h4>
      <ul>
        <li><strong>Method 1:</strong> Quick and dirty, when you know you're on Unix-like systems</li>
        <li><strong>Method 2:</strong> When you need fine control over the pipeline</li>
        <li><strong>Method 3:</strong> Mix of Unix tools and Node.js built-ins</li>
        <li><strong>Method 4:</strong> Cross-platform applications, production code</li>
      </ul>
    `,
    tags: ['concept', 'nodejs', 'process-management', 'development', 'cross-platform']
  },
  {
    id: 'recursive-number-finder',
    title: 'Recursive number finder',
    difficulty: 'Intermediate',
    description: `
      <p>Write a function <code>finder(targetNum)</code> that finds a sequence of operations to reach a target number.</p>
      <p>Starting from 1, you can repeatedly either:</p>
      <ul>
        <li>Add 7, or</li>
        <li>Multiply by 5</li>
      </ul>
      <p>Your function should return a string showing the sequence of operations, or <code>null</code> if the target cannot be reached.</p>
      <p><strong>Note:</strong> Not all numbers are reachable! For example, 13, 24, and 76 cannot be reached using only +7 and *5 operations from 1.</p>
      <p>Use a recursive helper function <code>find(current, history)</code> where:</p>
      <ul>
        <li><code>current</code> is the current number</li>
        <li><code>history</code> is a string tracking the operations performed</li>
      </ul>
      <p><strong>Examples:</strong></p>
      <pre>finder(12)  // "((1 * 5) + 7)" ✓ reachable
finder(13)  // null (unreachable)
finder(19)  // "(((1 * 5) + 7) + 7)" ✓ reachable</pre>
    `,
    starterCode: `/**
 * Find a sequence of operations (+7 or *5) to reach targetNum from 1
 * @param {number} targetNum - The target number to reach
 * @returns {string|null} - The sequence of operations, or null if impossible
 */
function finder(targetNum) {
  /**
   * Recursive helper function to explore possible paths
   * @param {number} current - The current number in the sequence
   * @param {string} history - String representation of operations so far
   * @returns {string|null} - The complete sequence if found, null otherwise
   */
  function find(current, history) {
    // Your code here
  }
  
  // Start the search from 1 with initial history "1"
  return find(1, "1");
}

// Test cases
console.log(finder(12));
console.log(finder(13));
console.log(finder(19));
console.log(finder(24));
console.log(finder(76));`,
    hints: [
      'Base case: if current equals targetNum, return the history.',
      'Base case: if current exceeds targetNum, return null (path failed).',
      'Recursive case: try adding 7, then try multiplying by 5.',
      'Use || to return the first successful path.',
      'Build history strings like: history + " + 7" or "(" + history + ") * 5"',
      'Expected outputs:\\nfinder(13) → "((1 * 5) + 7) + 7"\\nfinder(24) → "(((1 + 7) + 7) + 7) + 7" or "((1 * 5) * 5) + 7" or similar\\nfinder(76) → "(((1 * 5) * 5) * 5) + 7" or similar'
    ],
    solution: `/**
 * Find a sequence of operations (+7 or *5) to reach targetNum from 1
 * @param {number} targetNum - The target number to reach
 * @returns {string|null} - The sequence of operations, or null if impossible
 * 
 * @example
 * finder(13)  // Returns: "((1 * 5) + 7) + 7"
 * finder(24)  // Returns: "((1 * 5) * 5) + 7" or similar valid path
 * finder(2)   // Returns: null (impossible to reach)
 * 
 * @description
 * This function uses recursive backtracking to explore all possible sequences
 * of additions (+7) and multiplications (*5) starting from 1 until it finds
 * a path that reaches the target number. If the current number exceeds the
 * target, that branch is abandoned (pruned).
 * 
 * The recursion explores a tree of possibilities:
 *                    1
 *           /                 \\
 *        1+7=8              1*5=5
 *       /     \\            /     \\
 *   8+7=15  8*5=40    5+7=12  5*5=25
 *    ...     ...       ...      ...
 * 
 * Time complexity: O(2^n) in worst case, but pruning helps significantly
 * Space complexity: O(n) for the recursion stack depth
 */
function finder(targetNum) {
  /**
   * Recursive helper function to explore possible paths
   * @param {number} current - The current number in the sequence
   * @param {string} history - String representation of operations so far
   * @returns {string|null} - The complete sequence if found, null otherwise
   */
  function find(current, history) {
    // Base case: found the target
    if (current === targetNum) {
      return history;
    }
    
    // Base case: exceeded target (prune this branch)
    if (current > targetNum) {
      return null;
    }
    
    // Recursive case: try both operations using nullish coalescing
    return find(current + 7, \`(\${history}) + 7\`) ?? 
           find(current * 5, \`(\${history}) * 5\`);
  }
  
  return find(1, "1");
}

// Test cases
console.log(finder(13));   // ((1 * 5) + 7) + 7
console.log(finder(24));   // (((1 + 7) + 7) + 7) + 7 or other valid paths
console.log(finder(76));   // ((((1 * 5) * 5) + 7) + 7) + 7 or similar`,
    altSolutions: {
      'optimized-order': `/**
 * Optimized version that tries multiplication before addition
 * This often finds shorter paths for larger numbers
 */
function finder(targetNum) {
  function find(current, history) {
    if (current === targetNum) return history;
    if (current > targetNum) return null;
    
    // Try multiply first (often more efficient for large numbers)
    return find(current * 5, \`(\${history}) * 5\`) ?? 
           find(current + 7, \`(\${history}) + 7\`);
  }
  
  return find(1, "1");
}

console.log(finder(12));
console.log(finder(19));
console.log(finder(13));`,
      'with-path-length': `/**
 * Version that also tracks and returns the path length
 */
function finder(targetNum) {
  function find(current, history, depth) {
    if (current === targetNum) {
      return { path: history, length: depth };
    }
    if (current > targetNum) return null;
    
    return find(current + 7, \`(\${history}) + 7\`, depth + 1) ?? 
           find(current * 5, \`(\${history}) * 5\`, depth + 1);
  }
  
  const result = find(1, "1", 0);
  return result ? \`\${result.path} (steps: \${result.length})\` : null;
}

console.log(finder(12));
console.log(finder(19));
console.log(finder(13));`
    },
    altHints: {
      'optimized-order': [
        "Try multiplication before addition for potentially shorter paths",
        "Use the || operator for concise path selection"
      ],
      'with-path-length': [
        "Add a depth parameter to track the number of operations",
        "Return an object containing both path and length",
        "Format the final output to show the step count"
      ]
    },

    tags: ['recursion', 'algorithms', 'backtracking', 'functions', 'intermediate']
  },
  {
    id: 'arrow-square',
    title: 'Arrow function: square with implicit return',
    difficulty: 'Easy',
    description: `
      <p>Write an arrow function that uses a single parameter, contains no <code>return</code> statement, and returns the parameter squared.</p>
      <p>Hint: use the concise arrow function body (no curly braces) so the expression is returned implicitly.</p>
    `,
    starterCode: `// Define square using a single parameter and no return statement
const square = (n) => n * n;

console.log(square(3)); // → 9
console.log(square(0)); // → 0
console.log(square(-2)); // → 4
`,
    solution: `// concise arrow function with implicit return
const square = n => n * n;`,
    tests: [
      { input: 'square(3)', expected: '9' },
      { input: 'square(0)', expected: '0' },
      { input: 'square(-2)', expected: '4' }
    ],
    tags: ['functions', 'arrow-functions', 'easy']
  },
  {
    id: 'closure-divider',
    title: 'Closure: examine function factories with error handling',
    difficulty: 'Easy',
    description: `
      <p>Examine this <code>divider</code> function that demonstrates closure by creating 
      a customized division functions.</p>
      <p>The function:</p>
      <ul>
        <li>Takes a <code>divisor</code> parameter</li>
        <li>Returns a function that divides its input by that divisor</li>
        <li>Handles divide by zero by returning "Cannot divide by zero"</li>
        <li>The returned function "remembers" the divisor value (closure)</li>
      </ul>
      <p>Predict the outputs of the following code:</p>
    `,
    starterCode: `// Create a function that returns a customized divider
function divider(divisor) {
  return number => {
    if (divisor === 0) {
      return "Cannot divide by zero";
    }
    return number / divisor;
  };
}

// Create specific divider functions
let halve = divider(2);
let third = divider(3);
let invalid = divider(0);

console.log(halve(10));
console.log(third(12));
console.log(invalid(5));
/*
Notice that divider is called and creates an environment where divisor is fixed, that is, bound to
2, 3, or 0 respectively. That value is "remembered" by the returned function even after <code>divider</code> 
has finished executing, then saved into halve, third, and invalid. When those functions are later called 
with a number, they use the remembered divisor value. The closure allows the inner function to access
the outer function's scope even after the outer function has completed. This is what it means for a function to be
"closed over" its environment. The environment includes the specific divisor value that was passed in when the
factory function was called. A factory function is simply a function that creates and returns another function,
often with some preset configuration or behavior. Not every language is capable of closures. 

Languages that support first-class functions and lexical scoping typically support closures, such as JavaScript, 
Python, and Ruby. Lexical scoping means that the scope of variables is determined by their position in the source code,
which allows inner functions to access variables from their outer functions. First class functions mean that functions can be treated
like any other variable - they can be passed as arguments, returned from other functions, and assigned to variables.
JavaScript developers often leverage closures for data encapsulation, function factories, and maintaining state in 
asynchronous programming.

*/
  // What are the outputs of the above three console.log statements? 
`,
    solution: `function divider(divisor) {
  return number => {
    if (divisor === 0) {
      return "Cannot divide by zero";
    }
    return number / divisor;
  };
}

let halve = divider(2);
let third = divider(3);
let invalid = divider(0);

console.log(halve(10)); // → 5
console.log(third(12)); // → 4
console.log(invalid(5)); // → "Cannot divide by zero"`,
    tests: [
      { input: 'let halve = divider(2); halve(10)', expected: '5' },
      { input: 'let third = divider(3); third(12)', expected: '4' },
      { input: 'let invalid = divider(0); invalid(5)', expected: '"Cannot divide by zero"' }
    ],
    tags: ['functions', 'closure', 'factory-functions', 'error-handling', 'easy']
  },
  {
    id: 'count-uppercase-p',
    title: 'Count uppercase P characters in a string',
    difficulty: 'Easy',
    description: `
      <p>Write a function called <code>countPs</code> that takes a string as its only argument and returns the number of uppercase 'P' characters in the string.</p>
      <p>Examples:</p>
      <ul>
        <li><code>countPs("Programming")</code> should return <code>1</code></li>
        <li><code>countPs("PEPPER")</code> should return <code>3</code></li>
        <li><code>countPs("apple")</code> should return <code>0</code></li>
      </ul>
      <p>Try to implement this using different approaches - loops, array methods, or regular expressions.</p>
    `,
    starterCode: `// Write a function that counts uppercase P characters
function countPs(str) {
  // Your code here
}

console.log(countPs("Programming")); // → 1
console.log(countPs("PEPPER")); // → 3
console.log(countPs("apple")); // → 0
console.log(countPs("Python and PHP")); // → 3
`,
    solution: `// Solution 1: Traditional for loop
function countPs(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === 'P') {
      count++;
    }
  }
  return count;
}

// Solution 2: for...of loop (more readable)
function countPs(str) {
  let count = 0;
  for (let char of str) {
    if (char === 'P') {
      count++;
    }
  }
  return count;
}

/**
 * Solution 3: Array methods (functional approach)
 * Uses split() and filter() to count characters
 */
function countPs(str) {
  // str.split('') - Converts string into array of individual characters
  // Example: "PEPPER".split('') becomes ['P', 'E', 'P', 'P', 'E', 'R']
  
  // .filter(char => char === 'P') - Creates new array with only 'P' characters
  // Example: ['P', 'E', 'P', 'P', 'E', 'R'].filter(char => char === 'P') becomes ['P', 'P', 'P']
  
  // .length - Returns the count of elements in the filtered array
  return str.split('').filter(char => char === 'P').length;
}

/**
 * Solution 4: Regular expression (concise)
 * Uses regex pattern matching to find all occurrences
 */
function countPs(str) {
  // /P/g - Regular expression pattern:
  //   P - matches literal character 'P'
  //   g - global flag: finds ALL matches, not just the first one
  // str.match(/P/g) - Returns array of all matches, or null if none found
  // || [] - If no matches found (null), use empty array instead
  // .length - Count of matches found
  return (str.match(/P/g) || []).length;
}

// Solution 5: Array.from with filter
function countPs(str) {
  return Array.from(str).filter(char => char === 'P').length;
}`,
    alternatives: [
      {
        title: "Traditional For Loop",
        code: `function countPs(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === 'P') {
      count++;
    }
  }
  return count;
}`,
        notes: "Classic approach, very readable and efficient."
      },
      {
        title: "For...of Loop", 
        code: `function countPs(str) {
  let count = 0;
  for (let char of str) {
    if (char === 'P') {
      count++;
    }
  }
  return count;
}`,
        notes: "More modern and readable than traditional for loop."
      },
      {
        title: "Array Methods (Functional)",
        code: `/**
 * Uses split() and filter() methods
 */
function countPs(str) {
  // str.split('') - Converts string to array of characters
  // .filter(char => char === 'P') - Keeps only 'P' characters  
  // .length - Counts the filtered results
  return str.split('').filter(char => char === 'P').length;
}`,
        notes: "Functional programming approach. split('') converts string to character array, filter() keeps only 'P' characters, length gives the count."
      },
      {
        title: "Regular Expression",
        code: `/**
 * Uses regex pattern matching with global flag
 */
function countPs(str) {
  // /P/g - Pattern: 'P' character with global flag (find all)
  // str.match() - Returns array of matches or null
  // || [] - Fallback to empty array if no matches
  // .length - Count of matches
  return (str.match(/P/g) || []).length;
}`,
        notes: "Most concise approach. /P/g finds all 'P' characters globally, match() returns array of results, || [] handles no-match case."
      },
      {
        title: "Array.from with Filter",
        code: `function countPs(str) {
  return Array.from(str).filter(char => char === 'P').length;
}`,
        notes: "Alternative to split(''), more explicit about creating array."
      }
    ],
    tests: [
      { input: 'countPs("Programming")', expected: '1' },
      { input: 'countPs("PEPPER")', expected: '3' },
      { input: 'countPs("apple")', expected: '0' },
      { input: 'countPs("Python and PHP")', expected: '3' },
      { input: 'countPs("")', expected: '0' }
    ],
    tags: ['strings', 'loops', 'array-methods', 'regular-expressions', 'easy']
  },
  {
    id: 'count-any-character',
    title: 'Count any specific character in a string',
    difficulty: 'Easy',
    description: `
      <p>Write a function called <code>charCount</code> that takes two arguments:</p>
      <ul>
        <li>A string to search in</li>
        <li>A character to count</li>
      </ul>
      <p>The function should return the number of times the specified character appears in the string.</p>
      <p>Examples:</p>
      <ul>
        <li><code>charCount("Programming", "m")</code> should return <code>2</code></li>
        <li><code>charCount("BANANA", "A")</code> should return <code>3</code></li>
        <li><code>charCount("hello", "x")</code> should return <code>0</code></li>
      </ul>
      <p>This is a generalization that can count any character, not just a specific one.</p>
    `,
    starterCode: `// Write a function that counts any specific character
function charCount(str, char) {
  // Your code here
}

console.log(charCount("Programming", "m")); // → 2
console.log(charCount("BANANA", "A")); // → 3
console.log(charCount("hello", "x")); // → 0
console.log(charCount("Mississippi", "s")); // → 4
`,
    solution: `// Solution 1: Traditional for loop
function charCount(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }
  return count;
}

// Solution 2: for...of loop (more readable)
function charCount(str, char) {
  let count = 0;
  for (let character of str) {
    if (character === char) {
      count++;
    }
  }
  return count;
}

// Solution 3: Array methods (functional approach)
function charCount(str, char) {
  return str.split('').filter(c => c === char).length;
}

// Solution 4: Simple approach for most characters
function charCount(str, char) {
  return str.split(char).length - 1;
}

// Solution 5: Array.from with filter
function charCount(str, char) {
  return Array.from(str).filter(c => c === char).length;
}`,
    alternatives: [
      {
        title: "Traditional For Loop",
        code: `function charCount(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }
  return count;
}`,
        notes: "Most straightforward approach, very efficient and readable."
      },
      {
        title: "For...of Loop", 
        code: `function charCount(str, char) {
  let count = 0;
  for (let character of str) {
    if (character === char) {
      count++;
    }
  }
  return count;
}`,
        notes: "More modern syntax, avoids index management."
      },
      {
        title: "Array Methods (Functional)",
        code: `function charCount(str, char) {
  return str.split('').filter(c => c === char).length;
}`,
        notes: "Functional programming approach, very concise and expressive."
      },
      {
        title: "Split Method (Clever)",
        code: `function charCount(str, char) {
  return str.split(char).length - 1;
}`,
        notes: "Clever approach: split by character and count resulting parts minus 1."
      },
      {
        title: "Array.from with Filter",
        code: `function charCount(str, char) {
  return Array.from(str).filter(c => c === char).length;
}`,
        notes: "Alternative to split(), more explicit about string-to-array conversion."
      }
    ],
    tests: [
      { input: 'charCount("Programming", "m")', expected: '2' },
      { input: 'charCount("BANANA", "A")', expected: '3' },
      { input: 'charCount("hello", "x")', expected: '0' },
      { input: 'charCount("Mississippi", "s")', expected: '4' },
      { input: 'charCount("", "a")', expected: '0' },
      { input: 'charCount("aaa", "a")', expected: '3' }
    ],
    tags: ['strings', 'loops', 'array-methods', 'parameters', 'easy']
  },
  {
    id: 'range-and-sum-functions',
    title: 'Range and sum functions with optional step',
    difficulty: 'Easy',
    starterCode: `// Your code here

console.log(range(1, 10)); // → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(sum(range(1, 10))); // → 55
`,
    solution: `// Basic solution with loops
const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
// Sum function that adds up numbers in an array. The array does not need to be 
// generated by range. Note that "array" is not a reserved word in JavaScript.
const sum = (array) => {
  let total = 0;
  for (let num of array) {
    total += num;
  }
  return total;
};

console.log(range(1, 10)); // → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(sum(range(1, 10))); // → 55`,
    altSolutions: {
      'closure': `/**
 * Closure approach - numbersInRange closes over range(1, 10)
 * Demonstrates how a function can close over another function call.
 * The sumRange function has no parameters and always sums range(1, 10).
 */


/**
 * Creates an array containing all numbers from start to end (inclusive).
 * @param {number} start - The starting number
 * @param {number} end - The ending number
 * @returns {number[]} Array of numbers from start to end
 */
const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
const numbersInRange = range(1, 10);

/**
 * Returns the sum of numbers from 1 to 10 by closing over range(1, 10) and
 * saving it in numbersInRange. This step is optional but demonstrates a pattern
 * where a function can close over a specific value or function call.
  * @example
  * sumRange() // returns 55
 * @returns {number} The sum (55)
 */
const sumRange = () => {
  let total = 0;
  for (let num of numbersInRange) {
    total += num;
  }
  return total;
};

console.log(range(1, 10)); // → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(sumRange()); // → 55`,
      'with-step': `/**
 * Enhanced version with optional step parameter.
 * Demonstrates default parameters and conditional logic based on parameter values.
 * If end < start and no step provided, defaults to -1 for counting down.
 */

/**
 * Creates an array of numbers from start to end with a specified step.
 * @param {number} start - The starting number
 * @param {number} end - The ending number
 * @param {number} [step=start < end ? 1 : -1] - The increment/decrement value
 * @returns {number[]} Array of numbers with specified step
 */
function range(start, end, step = start < end ? 1 : -1) {
  const result = [];
  
  if (step > 0) {
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i >= end; i += step) {
      result.push(i);
    }
  }
  
  return result;
}

console.log(range(1, 10)); // → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(1, 10, 2)); // → [1, 3, 5, 7, 9]
console.log(range(5, 2, -1)); // → [5, 4, 3, 2]
console.log(range(5, 2)); // → [5, 4, 3, 2]
console.log(range(10, 1, -2)); // → [10, 8, 6, 4, 2]`,
      'arguments-object': `/**
 * Using the arguments object to accept any number of arguments.
 * Demonstrates the legacy arguments object available in all non-arrow functions.
 * Note: arguments is array-like but not a true array.
 */

/**
 * Sums all numbers passed as arguments using the arguments object.
 * @returns {number} The sum of all arguments
 */
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
console.log(sum(...range(1, 10))); // → 55`,
      'rest-parameter': `/**
 * Using the rest parameter (...) to collect all arguments into an array.
 * Demonstrates modern ES6 rest parameters which create a true array.
 * Rest parameters are preferred over the arguments object.
 */

/**
 * Creates an array of numbers from start to end (inclusive).
 * @param {number} start - The starting number
 * @param {number} end - The ending number
 * @returns {number[]} Array of numbers from start to end
 */
const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

/**
 * Sums all numbers passed as arguments using rest parameter.
 * @param {...number} numbers - Any number of numeric arguments
 * @returns {number} The sum of all arguments
 */
const sum = (...numbers) => {
  let total = 0;
  for (let num of numbers) {
    total += num;
  }
  return total;
};

console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)); // → 55
console.log(sum(...range(1, 10))); // → 55`
    },
    altTitles: {
      'closure': 'Closure Approach',
      'with-step': 'Enhanced with Step Parameter',
      'arguments-object': 'Using Arguments Object',
      'rest-parameter': 'Using Rest Parameter'
    },
    showTech4UnderPrimary: true,
    tests: [
      { input: 'range(1, 10)', expected: '[1,2,3,4,5,6,7,8,9,10]' },
      { input: 'sum(range(1, 10))', expected: '55' },
      { input: 'range(1, 10, 2)', expected: '[1,3,5,7,9]' },
      { input: 'range(5, 2, -1)', expected: '[5,4,3,2]' }
    ],
    tags: ['arrow-functions', 'arrays', 'loops', 'default-parameters', 'easy']
  },
  {
    id: 'reversing-an-array',
    title: 'Reversing an array',
    difficulty: 'Easy',
    starterCode: `// Your code here

let myArray = ["A", "B", "C"];
console.log(reverseArray(myArray));
// → ["C", "B", "A"]
console.log(myArray);
// → ["A", "B", "C"]

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
`,
    solution: `/**
 * Creates a new array with elements in reverse order (pure function).
 * @param {Array} array - The array to reverse
 * @returns {Array} A new reversed array
 */
function reverseArray(array) {
  const result = [];
  for (let i = array.length - 1; i >= 0; i--) {
    result.push(array[i]);
  }
  return result;
}

/**
 * Reverses an array in place by swapping elements (mutates original).
 * @param {Array} array - The array to reverse in place
 */
function reverseArrayInPlace(array) {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    const temp = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = temp;
  }
}

let myArray = ["A", "B", "C"];
console.log(reverseArray(myArray));
// → ["C", "B", "A"]
console.log(myArray);
// → ["A", "B", "C"]

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]`,
    altSolutions: {
      'unshift-method': `/**
 * Alternative implementation using unshift to build reversed array.
 * Less efficient than push as unshift is O(n) per operation.
 */

/**
 * Creates a new array with elements in reverse order using unshift.
 * @param {Array} array - The array to reverse
 * @returns {Array} A new reversed array
 */
function reverseArray(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.unshift(array[i]);
  }
  return result;
}

/**
 * Reverses an array in place by swapping elements.
 * @param {Array} array - The array to reverse in place
 */
function reverseArrayInPlace(array) {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    const temp = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = temp;
  }
}

let myArray = ["A", "B", "C"];
console.log(reverseArray(myArray));
// → ["C", "B", "A"]
console.log(myArray);
// → ["A", "B", "C"]

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]`,
      'destructuring-swap': `/**
 * Using array destructuring for swapping elements (ES6 syntax).
 * More concise than using a temporary variable.
 */

/**
 * Creates a new array with elements in reverse order.
 * @param {Array} array - The array to reverse
 * @returns {Array} A new reversed array
 */
function reverseArray(array) {
  const result = [];
  for (let i = array.length - 1; i >= 0; i--) {
    result.push(array[i]);
  }
  return result;
}

/**
 * Reverses an array in place using destructuring assignment for swaps.
 * @param {Array} array - The array to reverse in place
 */
function reverseArrayInPlace(array) {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    [array[i], array[array.length - 1 - i]] = [array[array.length - 1 - i], array[i]];
  }
}

let myArray = ["A", "B", "C"];
console.log(reverseArray(myArray));
// → ["C", "B", "A"]
console.log(myArray);
// → ["A", "B", "C"]

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]`
    },
    altTitles: {
      'unshift-method': 'Using unshift Method',
      'destructuring-swap': 'Using Destructuring for Swaps'
    },
    tests: [
      { input: 'reverseArray(["A", "B", "C"])', expected: '["C","B","A"]' },
      { input: 'reverseArray([1, 2, 3, 4, 5])', expected: '[5,4,3,2,1]' }
    ],
    tags: ['arrays', 'loops', 'pure-functions', 'side-effects', 'easy']
  },
  {
    id: 'list-data-structure',
    title: 'A list data structure',
    difficulty: 'Novice',
    starterCode: `// Your code here

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
`,
    solution: `/**
 * Converts an array to a linked list structure.
 * 
 * Building a list is easier when done back to front. This function iterates
 * over the array backward and for each element adds an object to the list.
 * Uses a local binding to hold the part of the list built so far, then
 * uses an assignment like: list = {value: X, rest: list} to add each element.
 * 
 * @param {Array} array - The array to convert
 * @returns {Object|null} A linked list with {value, rest} nodes
 */
function arrayToList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = { value: array[i], rest: list };
  }
  return list;
}

/**
 * Converts a linked list to an array.
 * 
 * Uses a for loop to iterate over the list: for (let node = list; node; node = node.rest).
 * Every iteration, node points to the current sublist. The body reads its value property
 * to get the current element. At the end of each iteration, node moves to the next sublist.
 * When node becomes null, we've reached the end of the list.
 * 
 * @param {Object|null} list - The linked list to convert
 * @returns {Array} An array of values from the list
 */
function listToArray(list) {
  const array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

/**
 * Adds an element to the front of a list.
 * 
 * Creates a new list node with the element as its value and the existing
 * list as its rest property. This is the fundamental building block for
 * constructing linked lists.
 * 
 * @param {*} element - The element to add
 * @param {Object|null} list - The existing list
 * @returns {Object} A new list with element prepended
 */
function prepend(element, list) {
  return { value: element, rest: list };
}

/**
 * Gets the element at the given position in a list (iterative approach).
 * 
 * Iterates through the list by following the rest references, counting
 * down from the given index. When the counter reaches 0, returns the
 * value at that node. Returns undefined if the index is out of bounds.
 * 
 * @param {Object|null} list - The linked list
 * @param {number} index - The position (0-based, where 0 is the first element)
 * @returns {*} The element at index, or undefined if not found
 */
function nth(list, index) {
  let node = list;
  for (let i = 0; i < index && node; i++) {
    node = node.rest;
  }
  return node ? node.value : undefined;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20`,
    altSolutions: {
      'recursive-nth': `/**
 * Alternative implementation with recursive nth function.
 * Demonstrates recursion by looking at smaller parts of the list.
 */

/**
 * Converts an array to a linked list structure.
 * @param {Array} array - The array to convert
 * @returns {Object|null} A linked list with {value, rest} nodes
 */
function arrayToList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = { value: array[i], rest: list };
  }
  return list;
}

/**
 * Converts a linked list to an array.
 * @param {Object|null} list - The linked list to convert
 * @returns {Array} An array of values from the list
 */
function listToArray(list) {
  const array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

/**
 * Adds an element to the front of a list.
 * @param {*} element - The element to add
 * @param {Object|null} list - The existing list
 * @returns {Object} A new list with element prepended
 */
function prepend(element, list) {
  return { value: element, rest: list };
}

/**
 * Gets the element at the given position in a list (recursive approach).
 * 
 * The recursive version looks at an ever smaller part of the "tail" of the list
 * and at the same time counts down the index until it reaches zero.
 * 
 * Base cases:
 * - If list is null/empty: return undefined (element not found)
 * - If index is 0: return list.value (found the element at the head)
 * 
 * Recursive case:
 * - To get element N+1: get the Nth element of the list that's in this list's rest property
 * - This means: recursively call nth(list.rest, index - 1)
 * 
 * @param {Object|null} list - The linked list
 * @param {number} index - The position (0-based, where 0 is the first element)
 * @returns {*} The element at index, or undefined if not found
 */
function nth(list, index) {
  if (!list) return undefined;
  if (index === 0) return list.value;
  return nth(list.rest, index - 1);
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20`,
      'forward-build': `/**
 * Alternative arrayToList that builds forward instead of backward.
 * Less efficient as it requires tracking the tail of the list.
 */

/**
 * Converts an array to a linked list by building forward.
 * @param {Array} array - The array to convert
 * @returns {Object|null} A linked list with {value, rest} nodes
 */
function arrayToList(array) {
  if (array.length === 0) return null;
  
  let head = { value: array[0], rest: null };
  let tail = head;
  
  for (let i = 1; i < array.length; i++) {
    tail.rest = { value: array[i], rest: null };
    tail = tail.rest;
  }
  
  return head;
}

/**
 * Converts a linked list to an array.
 * @param {Object|null} list - The linked list to convert
 * @returns {Array} An array of values from the list
 */
function listToArray(list) {
  const array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

/**
 * Adds an element to the front of a list.
 * @param {*} element - The element to add
 * @param {Object|null} list - The existing list
 * @returns {Object} A new list with element prepended
 */
function prepend(element, list) {
  return { value: element, rest: list };
}

/**
 * Gets the element at the given position in a list.
 * @param {Object|null} list - The linked list
 * @param {number} index - The position (0-based)
 * @returns {*} The element at index, or undefined if not found
 */
function nth(list, index) {
  let node = list;
  for (let i = 0; i < index && node; i++) {
    node = node.rest;
  }
  return node ? node.value : undefined;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20`
    },
    altTitles: {
      'recursive-nth': 'Recursive nth Function',
      'forward-build': 'Forward Build arrayToList'
    },
    tests: [
      { input: 'listToArray(arrayToList([10, 20, 30]))', expected: '[10,20,30]' },
      { input: 'nth(arrayToList([10, 20, 30]), 1)', expected: '20' }
    ],
    tags: ['data-structures', 'linked-lists', 'recursion', 'loops', 'easy']
  },
  {
    id: 'deep-comparison',
    title: 'Deep comparison',
    difficulty: 'Novice',
    starterCode: `// Your code here

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
`,
    solution: `/**
 * Performs a deep comparison between two values.
 * 
 * Strategy:
 * - Use === for primitive values and non-objects
 * - For objects, recursively compare all properties
 * - Handle the special case: typeof null == "object" (historical accident)
 * - Use Object.keys to iterate over properties
 * - Return false immediately when a mismatch is found
 * - Return true only if all checks pass
 * 
 * The algorithm ensures:
 * 1. Both values have the same number of properties
 * 2. Every property in one object exists in the other
 * 3. Property values are recursively equal
 * 
 * @param {*} value1 - First value to compare
 * @param {*} value2 - Second value to compare
 * @returns {boolean} True if values are deeply equal, false otherwise
 */
function deepEqual(value1, value2) {
  // If values are strictly equal (same reference or primitive value), they're equal
  if (value1 === value2) return true;
  
  // Check if both are objects (and not null, due to typeof null == "object")
  if (typeof value1 != "object" || value1 == null ||
      typeof value2 != "object" || value2 == null) {
    return false;
  }
  
  // Get property keys for both objects
  let keys1 = Object.keys(value1);
  let keys2 = Object.keys(value2);
  
  // Objects must have the same number of properties
  if (keys1.length != keys2.length) return false;
  
  // Check that all properties in value1 exist in value2 and have equal values
  for (let key of keys1) {
    // If value2 doesn't have this property, or the values aren't deeply equal
    if (!keys2.includes(key) || !deepEqual(value1[key], value2[key])) {
      return false;
    }
  }
  
  // All checks passed - objects are deeply equal
  return true;
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true`,
    altSolutions: {
      'hasOwnProperty': `/**
 * Alternative using hasOwnProperty for safer property checking.
 * More defensive against objects with prototype chain issues.
 */

/**
 * Performs a deep comparison between two values.
 * 
 * Uses hasOwnProperty to check if a property exists directly on the object
 * (not inherited from the prototype chain). This is safer than using includes().
 * 
 * @param {*} value1 - First value to compare
 * @param {*} value2 - Second value to compare
 * @returns {boolean} True if values are deeply equal, false otherwise
 */
function deepEqual(value1, value2) {
  if (value1 === value2) return true;
  
  if (typeof value1 != "object" || value1 == null ||
      typeof value2 != "object" || value2 == null) {
    return false;
  }
  
  let keys1 = Object.keys(value1);
  let keys2 = Object.keys(value2);
  
  if (keys1.length != keys2.length) return false;
  
  for (let key of keys1) {
    if (!value2.hasOwnProperty(key) || !deepEqual(value1[key], value2[key])) {
      return false;
    }
  }
  
  return true;
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true`,
      'concise': `/**
 * More concise version using modern array methods.
 * Uses every() to check all properties in a single expression.
 */

/**
 * Performs a deep comparison between two values.
 * 
 * Leverages Array.every() to elegantly check that all properties
 * in value1 exist in value2 with deeply equal values.
 * 
 * @param {*} value1 - First value to compare
 * @param {*} value2 - Second value to compare
 * @returns {boolean} True if values are deeply equal, false otherwise
 */
function deepEqual(value1, value2) {
  if (value1 === value2) return true;
  
  if (typeof value1 != "object" || value1 == null ||
      typeof value2 != "object" || value2 == null) {
    return false;
  }
  
  let keys1 = Object.keys(value1);
  let keys2 = Object.keys(value2);
  
  if (keys1.length != keys2.length) return false;
  
  return keys1.every(key => 
    keys2.includes(key) && deepEqual(value1[key], value2[key])
  );
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true`
    },
    altTitles: {
      'hasOwnProperty': 'Using hasOwnProperty',
      'concise': 'Concise with Array.every()'
    },
    tests: [
      { input: 'deepEqual({a: 1}, {a: 1})', expected: 'true' },
      { input: 'deepEqual({a: 1}, {a: 2})', expected: 'false' },
      { input: 'deepEqual({a: {b: 1}}, {a: {b: 1}})', expected: 'true' }
    ],
    tags: ['objects', 'recursion', 'comparison', 'typeof', 'novice']
  },
  {
    id: 'tree-traversal',
    title: 'Recursive tree traversal',
    difficulty: 'Easy',
    starterCode: `const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 3, children: [] }]
    },
    {
      value: 4,
      children: []
    }
  ]
};

// Your code here

traverseTree(tree);
// Expected output:
// 1
// 2
// 3
// 4
`,
    solution: `/**
 * Recursively traverses a tree data structure in depth-first order.
 * 
 * This demonstrates how recursion navigates through nested structures:
 * - Base case: Print the current node's value
 * - Recursive case: For each child, recursively call traverseTree
 * 
 * The function call stack manages the traversal automatically:
 * - When a node has children, we dive deeper (recursion)
 * - When we reach a leaf (no children), we return and continue with siblings
 * - This creates depth-first traversal: process node, then all descendants
 * 
 * @param {Object} node - A tree node with 'value' and 'children' properties
 */
function traverseTree(node) {
  // Print the current node's value
  console.log(node.value);
  
  // Recursively traverse each child node
  for (let child of node.children) {
    traverseTree(child);
  }
}

const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 3, children: [] }]
    },
    {
      value: 4,
      children: []
    }
  ]
};

traverseTree(tree);
// Output:
// 1
// 2
// 3
// 4`,
    altSolutions: {
      'with-depth': `/**
 * Enhanced version that tracks depth level for indented output.
 * Shows the tree structure visually with indentation.
 */

/**
 * Recursively traverses a tree with depth tracking for visualization.
 * 
 * Adds a depth parameter to show the nesting level of each node.
 * Each level is indented by 2 spaces, making the tree structure visible.
 * 
 * @param {Object} node - A tree node with 'value' and 'children' properties
 * @param {number} depth - Current depth in the tree (default: 0)
 */
function traverseTree(node, depth = 0) {
  // Print with indentation based on depth
  console.log('  '.repeat(depth) + node.value);
  
  // Recursively traverse children at increased depth
  for (let child of node.children) {
    traverseTree(child, depth + 1);
  }
}

const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 3, children: [] }]
    },
    {
      value: 4,
      children: []
    }
  ]
};

traverseTree(tree);
// Output:
// 1
//   2
//     3
//   4`,
      'array-methods': `/**
 * Alternative using forEach instead of for...of loop.
 * Demonstrates functional programming approach.
 */

/**
 * Recursively traverses a tree using array method forEach.
 * 
 * Uses forEach to iterate over children, which is more functional
 * in style. The recursion pattern remains the same: print current
 * node, then recursively process all children.
 * 
 * @param {Object} node - A tree node with 'value' and 'children' properties
 */
function traverseTree(node) {
  console.log(node.value);
  
  // Use forEach for functional iteration
  node.children.forEach(child => traverseTree(child));
}

const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 3, children: [] }]
    },
    {
      value: 4,
      children: []
    }
  ]
};

traverseTree(tree);
// Output:
// 1
// 2
// 3
// 4`,
      'collect-values': `/**
 * Alternative that collects all values in an array instead of printing.
 * Useful when you need to process the values further.
 */

/**
 * Recursively traverses a tree and collects all values.
 * 
 * Instead of printing, this version builds an array of all values
 * in depth-first order. This is more flexible as you can then
 * decide what to do with the collected values.
 * 
 * @param {Object} node - A tree node with 'value' and 'children' properties
 * @param {Array} result - Array to collect values (default: new array)
 * @returns {Array} Array of all values in depth-first order
 */
function traverseTree(node, result = []) {
  // Add current node's value to result array
  result.push(node.value);
  
  // Recursively collect values from children
  for (let child of node.children) {
    traverseTree(child, result);
  }
  
  return result;
}

const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 3, children: [] }]
    },
    {
      value: 4,
      children: []
    }
  ]
};

const values = traverseTree(tree);
console.log(values);
// Output: [1, 2, 3, 4]

// Can also print them line by line
values.forEach(v => console.log(v));
// Output:
// 1
// 2
// 3
// 4`
    },
    altTitles: {
      'with-depth': 'With Depth Tracking',
      'array-methods': 'Using forEach',
      'collect-values': 'Collect Values in Array'
    },
    tests: [
      { input: 'traverseTree({value: 1, children: []})', expected: 'undefined' },
      { input: 'traverseTree({value: 1, children: [{value: 2, children: []}]})', expected: 'undefined' }
    ],
    tags: ['recursion', 'trees', 'data-structures', 'depth-first', 'easy']
  },
  {
    id: 'journal-correlation',
    title: 'Analyzing Jacques\' Journal: phi coefficient correlation',
    difficulty: 'Easy',
    description: `
      <p>Jacques the werewolf kept a journal tracking daily events and whether he transformed into a squirrel. 
      We want to find which events are strongly correlated (positively or negatively) with his transformations.</p>
      <p>Use the provided <code>phi</code>, <code>tableFor</code>, and <code>journalEvents</code> functions to analyze the journal data.</p>
      <p>Find events with a correlation greater than 0.1 or less than -0.1.</p>
    `,
    starterCode: `// Jacques' journal data
const JOURNAL = [
  {"events":["carrot","exercise","weekend"],"squirrel":false},
  {"events":["bread","pudding","brushed teeth","weekend","touched tree"],"squirrel":false},
  {"events":["carrot","nachos","brushed teeth","cycling","weekend"],"squirrel":false},
  {"events":["brussel sprouts","ice cream","brushed teeth","computer","weekend"],"squirrel":false},
  {"events":["potatoes","candy","brushed teeth","exercise","weekend","dentist"],"squirrel":false},
  {"events":["brussel sprouts","pudding","brushed teeth","running","weekend"],"squirrel":false},
  {"events":["pizza","brushed teeth","computer","work","touched tree"],"squirrel":false},
  {"events":["bread","beer","brushed teeth","cycling","work"],"squirrel":false},
  {"events":["cauliflower","brushed teeth","work"],"squirrel":false},
  {"events":["pizza","brushed teeth","cycling","work"],"squirrel":false},
  {"events":["lasagna","nachos","brushed teeth","work"],"squirrel":false},
  {"events":["brushed teeth","weekend","touched tree"],"squirrel":false},
  {"events":["lettuce","brushed teeth","television","weekend"],"squirrel":false},
  {"events":["spaghetti","brushed teeth","work"],"squirrel":false},
  {"events":["brushed teeth","computer","work"],"squirrel":false},
  {"events":["lettuce","nachos","brushed teeth","work"],"squirrel":false},
  {"events":["carrot","brushed teeth","running","work"],"squirrel":false},
  {"events":["brushed teeth","work"],"squirrel":false},
  {"events":["cauliflower","reading","weekend"],"squirrel":false},
  {"events":["bread","brushed teeth","weekend"],"squirrel":false},
  {"events":["lasagna","brushed teeth","exercise","work"],"squirrel":false},
  {"events":["spaghetti","brushed teeth","reading","work"],"squirrel":false},
  {"events":["carrot","ice cream","brushed teeth","television","work"],"squirrel":false},
  {"events":["spaghetti","nachos","work"],"squirrel":false},
  {"events":["cauliflower","ice cream","brushed teeth","cycling","work"],"squirrel":false},
  {"events":["spaghetti","peanuts","computer","weekend"],"squirrel":true},
  {"events":["potatoes","ice cream","brushed teeth","computer","weekend"],"squirrel":false},
  {"events":["potatoes","ice cream","brushed teeth","work"],"squirrel":false},
  {"events":["peanuts","brushed teeth","running","work"],"squirrel":false},
  {"events":["potatoes","exercise","work"],"squirrel":false},
  {"events":["pizza","ice cream","computer","work"],"squirrel":false},
  {"events":["lasagna","ice cream","work"],"squirrel":false},
  {"events":["cauliflower","candy","reading","weekend"],"squirrel":false},
  {"events":["lasagna","nachos","brushed teeth","running","weekend"],"squirrel":false},
  {"events":["potatoes","brushed teeth","work"],"squirrel":false},
  {"events":["carrot","work"],"squirrel":false},
  {"events":["pizza","beer","work","dentist"],"squirrel":false},
  {"events":["lasagna","pudding","cycling","work"],"squirrel":false},
  {"events":["spaghetti","brushed teeth","reading","work"],"squirrel":false},
  {"events":["spaghetti","pudding","television","weekend"],"squirrel":false},
  {"events":["bread","brushed teeth","exercise","weekend"],"squirrel":false},
  {"events":["lasagna","peanuts","work"],"squirrel":true},
  {"events":["pizza","work"],"squirrel":false},
  {"events":["potatoes","exercise","work"],"squirrel":false},
  {"events":["brushed teeth","exercise","work"],"squirrel":false},
  {"events":["spaghetti","brushed teeth","television","work"],"squirrel":false},
  {"events":["pizza","cycling","weekend"],"squirrel":false},
  {"events":["carrot","brushed teeth","weekend"],"squirrel":false},
  {"events":["carrot","beer","brushed teeth","work"],"squirrel":false},
  {"events":["pizza","peanuts","candy","work"],"squirrel":true},
  {"events":["carrot","peanuts","brushed teeth","reading","work"],"squirrel":false},
  {"events":["potatoes","peanuts","brushed teeth","work"],"squirrel":false},
  {"events":["carrot","nachos","brushed teeth","exercise","work"],"squirrel":false},
  {"events":["pizza","peanuts","brushed teeth","television","weekend"],"squirrel":false},
  {"events":["lasagna","brushed teeth","cycling","weekend"],"squirrel":false},
  {"events":["cauliflower","peanuts","brushed teeth","computer","work","touched tree"],"squirrel":false},
  {"events":["lettuce","brushed teeth","television","work"],"squirrel":false},
  {"events":["potatoes","brushed teeth","computer","work"],"squirrel":false},
  {"events":["bread","candy","work"],"squirrel":false},
  {"events":["potatoes","nachos","work"],"squirrel":false},
  {"events":["carrot","pudding","brushed teeth","weekend"],"squirrel":false},
  {"events":["carrot","brushed teeth","exercise","weekend","touched tree"],"squirrel":false},
  {"events":["brussel sprouts","running","work"],"squirrel":false},
  {"events":["brushed teeth","work"],"squirrel":false},
  {"events":["lettuce","brushed teeth","running","work"],"squirrel":false},
  {"events":["candy","brushed teeth","work"],"squirrel":false},
  {"events":["brussel sprouts","brushed teeth","computer","work"],"squirrel":false},
  {"events":["bread","brushed teeth","weekend"],"squirrel":false},
  {"events":["cauliflower","brushed teeth","weekend"],"squirrel":false},
  {"events":["spaghetti","candy","television","work","touched tree"],"squirrel":false},
  {"events":["carrot","pudding","brushed teeth","work"],"squirrel":false},
  {"events":["lettuce","brushed teeth","work"],"squirrel":false},
  {"events":["carrot","ice cream","brushed teeth","cycling","work"],"squirrel":false},
  {"events":["pizza","brushed teeth","work"],"squirrel":false},
  {"events":["spaghetti","peanuts","exercise","weekend"],"squirrel":true},
  {"events":["bread","beer","computer","weekend","touched tree"],"squirrel":false},
  {"events":["brushed teeth","running","work"],"squirrel":false},
  {"events":["lettuce","peanuts","brushed teeth","work","touched tree"],"squirrel":false},
  {"events":["lasagna","brushed teeth","television","work"],"squirrel":false},
  {"events":["cauliflower","brushed teeth","running","work"],"squirrel":false},
  {"events":["carrot","brushed teeth","running","work"],"squirrel":false},
  {"events":["carrot","reading","weekend"],"squirrel":false},
  {"events":["carrot","peanuts","reading","weekend"],"squirrel":true},
  {"events":["potatoes","brushed teeth","running","work"],"squirrel":false},
  {"events":["lasagna","ice cream","work","touched tree"],"squirrel":false},
  {"events":["cauliflower","peanuts","brushed teeth","cycling","work"],"squirrel":false},
  {"events":["pizza","brushed teeth","running","work"],"squirrel":false},
  {"events":["lettuce","brushed teeth","work"],"squirrel":false},
  {"events":["bread","brushed teeth","television","weekend"],"squirrel":false},
  {"events":["cauliflower","peanuts","brushed teeth","weekend"],"squirrel":false}
];

// Helper functions
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}

// Your code here - analyze correlations
for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ":", correlation);
  }
}
// → weekend: 0.137...
// → brushed teeth: -0.380...
// → candy: 0.129...
// → work: -0.137...
// → spaghetti: 0.242...
// → reading: 0.110...
// → peanuts: 0.590...
`,
    solution: `// Journal dataset (Jacques' daily log)
const JOURNAL = [
  {"events":["carrot","exercise","weekend"],"squirrel":false},
  {"events":["bread","pudding","brushed teeth","weekend","touched tree"],"squirrel":false},
  {"events":["carrot","nachos","brushed teeth","cycling","weekend"],"squirrel":false},
  {"events":["brussel sprouts","ice cream","brushed teeth","computer","weekend"],"squirrel":false},
  {"events":["potatoes","candy","brushed teeth","exercise","weekend","dentist"],"squirrel":false},
  {"events":["brussel sprouts","pudding","brushed teeth","running","weekend"],"squirrel":false},
  {"events":["pizza","brushed teeth","computer","work","touched tree"],"squirrel":false},
  {"events":["bread","beer","brushed teeth","cycling","work"],"squirrel":false},
  {"events":["cauliflower","brushed teeth","work"],"squirrel":false},
  {"events":["pizza","brushed teeth","cycling","work"],"squirrel":false},
  {"events":["lasagna","nachos","brushed teeth","work"],"squirrel":false},
  {"events":["brushed teeth","weekend","touched tree"],"squirrel":false},
  {"events":["lettuce","brushed teeth","television","weekend"],"squirrel":false},
  {"events":["spaghetti","brushed teeth","work"],"squirrel":false},
  {"events":["brushed teeth","computer","work"],"squirrel":false},
  {"events":["lettuce","nachos","brushed teeth","work"],"squirrel":false},
  {"events":["carrot","brushed teeth","running","work"],"squirrel":false},
  {"events":["brushed teeth","work"],"squirrel":false},
  {"events":["cauliflower","reading","weekend"],"squirrel":false},
  {"events":["bread","brushed teeth","weekend"],"squirrel":false},
  {"events":["lasagna","brushed teeth","exercise","work"],"squirrel":false},
  {"events":["spaghetti","brushed teeth","reading","work"],"squirrel":false},
  {"events":["carrot","ice cream","brushed teeth","television","work"],"squirrel":false},
  {"events":["spaghetti","nachos","work"],"squirrel":false},
  {"events":["cauliflower","ice cream","brushed teeth","cycling","work"],"squirrel":false},
  {"events":["spaghetti","peanuts","computer","weekend"],"squirrel":true},
  {"events":["potatoes","ice cream","brushed teeth","computer","weekend"],"squirrel":false},
  {"events":["potatoes","ice cream","brushed teeth","work"],"squirrel":false},
  {"events":["peanuts","brushed teeth","running","work"],"squirrel":false},
  {"events":["potatoes","exercise","work"],"squirrel":false},
  {"events":["pizza","ice cream","computer","work"],"squirrel":false},
  {"events":["lasagna","ice cream","work"],"squirrel":false},
  {"events":["cauliflower","candy","reading","weekend"],"squirrel":false},
  {"events":["lasagna","nachos","brushed teeth","running","weekend"],"squirrel":false},
  {"events":["potatoes","brushed teeth","work"],"squirrel":false},
  {"events":["carrot","work"],"squirrel":false},
  {"events":["pizza","beer","work","dentist"],"squirrel":false},
  {"events":["lasagna","pudding","cycling","work"],"squirrel":false},
  {"events":["spaghetti","brushed teeth","reading","work"],"squirrel":false},
  {"events":["spaghetti","pudding","television","weekend"],"squirrel":false},
  {"events":["bread","brushed teeth","exercise","weekend"],"squirrel":false},
  {"events":["lasagna","peanuts","work"],"squirrel":true},
  {"events":["pizza","work"],"squirrel":false},
  {"events":["potatoes","exercise","work"],"squirrel":false},
  {"events":["brushed teeth","exercise","work"],"squirrel":false},
  {"events":["spaghetti","brushed teeth","television","work"],"squirrel":false},
  {"events":["pizza","cycling","weekend"],"squirrel":false},
  {"events":["carrot","brushed teeth","weekend"],"squirrel":false},
  {"events":["carrot","beer","brushed teeth","work"],"squirrel":false},
  {"events":["pizza","peanuts","candy","work"],"squirrel":true},
  {"events":["carrot","peanuts","brushed teeth","reading","work"],"squirrel":false},
  {"events":["potatoes","peanuts","brushed teeth","work"],"squirrel":false},
  {"events":["carrot","nachos","brushed teeth","exercise","work"],"squirrel":false},
  {"events":["pizza","peanuts","brushed teeth","television","weekend"],"squirrel":false},
  {"events":["lasagna","brushed teeth","cycling","weekend"],"squirrel":false},
  {"events":["cauliflower","peanuts","brushed teeth","computer","work","touched tree"],"squirrel":false},
  {"events":["lettuce","brushed teeth","television","work"],"squirrel":false},
  {"events":["potatoes","brushed teeth","computer","work"],"squirrel":false},
  {"events":["bread","candy","work"],"squirrel":false},
  {"events":["potatoes","nachos","work"],"squirrel":false},
  {"events":["carrot","pudding","brushed teeth","weekend"],"squirrel":false},
  {"events":["carrot","brushed teeth","exercise","weekend","touched tree"],"squirrel":false},
  {"events":["brussel sprouts","running","work"],"squirrel":false},
  {"events":["brushed teeth","work"],"squirrel":false},
  {"events":["lettuce","brushed teeth","running","work"],"squirrel":false},
  {"events":["candy","brushed teeth","work"],"squirrel":false},
  {"events":["brussel sprouts","brushed teeth","computer","work"],"squirrel":false},
  {"events":["bread","brushed teeth","weekend"],"squirrel":false},
  {"events":["cauliflower","brushed teeth","weekend"],"squirrel":false},
  {"events":["spaghetti","candy","television","work","touched tree"],"squirrel":false},
  {"events":["carrot","pudding","brushed teeth","work"],"squirrel":false},
  {"events":["lettuce","brushed teeth","work"],"squirrel":false},
  {"events":["carrot","ice cream","brushed teeth","cycling","work"],"squirrel":false},
  {"events":["pizza","brushed teeth","work"],"squirrel":false},
  {"events":["spaghetti","peanuts","exercise","weekend"],"squirrel":true},
  {"events":["bread","beer","computer","weekend","touched tree"],"squirrel":false},
  {"events":["brushed teeth","running","work"],"squirrel":false},
  {"events":["lettuce","peanuts","brushed teeth","work","touched tree"],"squirrel":false},
  {"events":["lasagna","brushed teeth","television","work"],"squirrel":false},
  {"events":["cauliflower","brushed teeth","running","work"],"squirrel":false},
  {"events":["carrot","brushed teeth","running","work"],"squirrel":false},
  {"events":["carrot","reading","weekend"],"squirrel":false},
  {"events":["carrot","peanuts","reading","weekend"],"squirrel":true},
  {"events":["potatoes","brushed teeth","running","work"],"squirrel":false},
  {"events":["lasagna","ice cream","work","touched tree"],"squirrel":false},
  {"events":["cauliflower","peanuts","brushed teeth","cycling","work"],"squirrel":false},
  {"events":["pizza","brushed teeth","running","work"],"squirrel":false},
  {"events":["lettuce","brushed teeth","work"],"squirrel":false},
  {"events":["bread","brushed teeth","television","weekend"],"squirrel":false},
  {"events":["cauliflower","peanuts","brushed teeth","weekend"],"squirrel":false}
];

/**
 * Computes the phi coefficient (φ) for measuring correlation.
 * The phi coefficient measures correlation between two binary variables.
 * 
 * @param {number[]} table - A 2x2 contingency table as [n00, n01, n10, n11]
 *                          n00 = neither event occurred
 *                          n01 = event1 only
 *                          n10 = event2 only  
 *                          n11 = both events occurred
 * @returns {number} The phi coefficient ranging from -1 to 1
 */
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

/**
 * Creates a contingency table for a specific event in the journal.
 * Counts occurrences in four categories based on event presence and squirrel transformation.
 * 
 * @param {string} event - The event to analyze
 * @param {Array} journal - Array of journal entries with events and squirrel properties
 * @returns {number[]} A 2x2 table [n00, n01, n10, n11]
 */
function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

/**
 * Extracts all unique events from the journal.
 * 
 * @param {Array} journal - Array of journal entries
 * @returns {string[]} Array of unique event names
 */
function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}

// Analyze correlations
for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ":", correlation);
  }
}
// Output:
// weekend: 0.13719886811400708
// brushed teeth: -0.3805211953235953
// candy: 0.12964074471043288
// work: -0.13719886811400708
// spaghetti: 0.242535625036333
// reading: 0.11068280537595927
// peanuts: 0.59026798116852
`,
    altSolutions: {
      'squirrel-days-only': `// Filter to see only the days Jacques turned into a squirrel
const squirrelDays = JOURNAL.filter(entry => entry.squirrel);

console.log("Days Jacques turned into a squirrel:", squirrelDays.length);
console.log("\\nEvents on each squirrel day:");

squirrelDays.forEach((entry, i) => {
  console.log(\`Day \${i + 1}: \${entry.events.join(", ")}\`);
});

// Collect frequency of events on squirrel days
const squirrelEvents = {};
for (let entry of squirrelDays) {
  for (let event of entry.events) {
    squirrelEvents[event] = (squirrelEvents[event] || 0) + 1;
  }
}

console.log("\\nEvent frequency on squirrel days:");
Object.entries(squirrelEvents)
  .sort((a, b) => b[1] - a[1])
  .forEach(([event, count]) => {
    console.log(\`  \${event}: \${count}/5 days\`);
  });
// Output shows peanuts appears on ALL 5 squirrel days!`,
      'peanuts-analysis': `// Deep dive: Why does peanuts have the highest correlation?
console.log("Peanuts analysis:\\n");

let peanutsAndSquirrel = 0;
let peanutsNoSquirrel = 0;
let noPeanutsButSquirrel = 0;
let noPeanutsNoSquirrel = 0;

for (let entry of JOURNAL) {
  const hasPeanuts = entry.events.includes("peanuts");
  
  if (hasPeanuts && entry.squirrel) peanutsAndSquirrel++;
  else if (hasPeanuts && !entry.squirrel) peanutsNoSquirrel++;
  else if (!hasPeanuts && entry.squirrel) noPeanutsButSquirrel++;
  else noPeanutsNoSquirrel++;
}

console.log("Peanuts + Squirrel:", peanutsAndSquirrel);
console.log("Peanuts + No Squirrel:", peanutsNoSquirrel);
console.log("No Peanuts + Squirrel:", noPeanutsButSquirrel);
console.log("No Peanuts + No Squirrel:", noPeanutsNoSquirrel);
console.log("\\nConclusion: Peanuts present on", peanutsAndSquirrel, "out of 5 squirrel days (100%)!");
// Output: peanuts appears on ALL 5 squirrel days, hence the strong correlation!`
    },
    altTitles: {
      'squirrel-days-only': 'Show Squirrel Day Events',
      'peanuts-analysis': 'Why Peanuts Correlation Is Highest'
    },
    tests: [
      { input: 'phi([76, 9, 4, 1])', expected: '0.068599434' },
      { input: 'tableFor("pizza", JOURNAL)[3]', expected: '0' }
    ],
    tags: ['arrays', 'data-analysis', 'correlation', 'loops', 'easy']
  },
  {
    id: 'destructuring',
    title: 'Array destructuring for phi',
    difficulty: 'Novice',
    starterCode: `// Refactor this phi function to use array destructuring in the
// parameter list: function phi([n00, n01, n10, n11]) { ... }

function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

console.log(phi([1,2,3,4]).toFixed(3)); // → expected approx -0.089
`,
    solution: `/**
 * Computes the phi coefficient using parameter destructuring.
 * @param {number[]} table - Array [n00, n01, n10, n11]
 * @returns {number} The phi coefficient
 */
function phi([n00, n01, n10, n11]) {
  return (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) *
              (n01 + n11) * (n00 + n10));
}

// Example run
console.log(phi([1,2,3,4]).toFixed(3)); // → -0.089
`,
    altSolutions: {
      'destructure-inside': `/**
 * Destructure inside the function body instead of the parameter list.
 * Useful when you need the raw parameter for other reasons.
 */
function phi(table) {
  const [n00, n01, n10, n11] = table;
  return (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) *
              (n01 + n11) * (n00 + n10));
}

console.log(phi([1,2,3,4]).toFixed(3)); // → -0.089`,
      'const-bindings': `/**
 * Using const bindings to emphasize immutability of local names.
 */
function phi([n00, n01, n10, n11]) {
  const numerator = n11 * n00 - n10 * n01;
  const denom = Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10));
  return numerator / denom;
}

console.log(phi([1,2,3,4]).toFixed(3)); // → -0.089`
    },
    altTitles: {
      'destructure-inside': 'Destructure Inside Body',
      'const-bindings': 'Use Const Bindings'
    },
    tests: [
      { input: 'phi([1,2,3,4]).toFixed(3)', expected: '-0.089' }
    ],
    tags: ['destructuring', 'parameters', 'math', 'novice']
  },
  {
    id: 'optional-property-access',
    title: 'Optional property access (?.)',
    difficulty: 'Easy',
    starterCode: `// Implement a small helper that uses optional chaining to safely
// access nested properties.

function city(object) {
  // Your code here
}

console.log(city({address: {city: "Toronto"}})); // → Toronto
console.log(city({name: "Vera"})); // → undefined
`,
    solution: `/**
 * Safely returns object.address.city if present, otherwise undefined.
 * Uses optional chaining (?.) to avoid errors when accessing nested props.
 *
 * @param {Object|undefined|null} object - Object that may or may not have address
 * @returns {string|undefined} The city string or undefined when not present
 */
function city(object) {
  return object?.address?.city;
}

console.log(city({address: {city: "Toronto"}})); // → Toronto
console.log(city({name: "Vera"})); // → undefined
`,
    altSolutions: {
      'guard-checks': `/**
 * Guarded property access using explicit checks (pre-optional-chaining style).
 */
function city(object) {
  if (!object || !object.address) return undefined;
  return object.address.city;
}

console.log(city({address: {city: "Toronto"}})); // → Toronto
console.log(city({name: "Vera"})); // → undefined`,
      'bracket-optional': `/**
 * Demonstrates optional chaining with bracket access as an alternative.
 */
function city(object) {
  return object?.address?.['city'];
}

console.log(city({address: {city: "Toronto"}})); // → Toronto
console.log(city({name: "Vera"})); // → undefined`
    },
    altTitles: {
      'guard-checks': 'Guarded Checks',
      'bracket-optional': 'Bracket Optional Access'
    },
    tests: [
      { input: 'city({address: {city: "Toronto"}})', expected: 'Toronto' },
      { input: 'typeof city({name: "Vera"})', expected: 'undefined' }
    ],
    tags: ['optional-chaining', 'accessors', 'easy']
  },
  {
    id: 'destructuring-null-safe',
    title: 'Destructuring with null / undefined safety',
    difficulty: 'Novice',
    starterCode: `// Use array destructuring safely when the input array may be null
// or contain null/undefined elements.

function safeDestructure(arr) {
  // Your code here
}

console.log(JSON.stringify(safeDestructure([1,2]))); // → {"a":1,"b":2}
console.log(JSON.stringify(safeDestructure(null))); // → {"a":null,"b":null}
`,
    solution: `/**
 * Safely destructures the first two elements of an array into a/b.
 * If the array argument is null or undefined, we fall back to an empty
 * array for destructuring. We use defaults of null so JSON.stringify
 * preserves explicit null values in the returned object.
 *
 * @param {Array|null|undefined} arr - The input array which may be null
 * @returns {{a:any,b:any}} Object with properties a and b (null when missing)
 */
function safeDestructure(arr) {
  const [a = null, b = null] = arr || [];
  return { a, b };
}

console.log(JSON.stringify(safeDestructure([1,2]))); // → {"a":1,"b":2}
console.log(JSON.stringify(safeDestructure(null))); // → {"a":null,"b":null}
`,
    altSolutions: {
      'explicit-guard': `/**
 * Explicitly guard against null before destructuring so we don't throw.
 */
function safeDestructure(arr) {
  if (!arr) return { a: null, b: null };
  const [a = null, b = null] = arr;
  return { a, b };
}

console.log(JSON.stringify(safeDestructure([1,2]))); // → {"a":1,"b":2}
console.log(JSON.stringify(safeDestructure(null))); // → {"a":null,"b":null}
`,
      'default-param': `/**
 * Use a default parameter value to avoid destructuring null/undefined.
 */
function safeDestructure(arr = []) {
  const [a = null, b = null] = arr;
  return { a, b };
}

console.log(JSON.stringify(safeDestructure([1,2]))); // → {"a":1,"b":2}
console.log(JSON.stringify(safeDestructure(null))); // → TypeError (null passed overrides default)
` 
    },
    altTitles: {
      'explicit-guard': 'Explicit Guard',
      'default-param': 'Default Parameter (note caveat)'
    },
    tests: [
      { input: 'JSON.stringify(safeDestructure([1,2]))', expected: '{"a":1,"b":2}' },
      { input: 'JSON.stringify(safeDestructure(null))', expected: '{"a":null,"b":null}' }
    ],
    tags: ['destructuring', 'null-safety', 'novice']
  },
];

export default problems;





















































































































































































