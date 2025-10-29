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
  // show a small Medium lozenge next to the Easy badge for this problem
  showMediumLozenge: true,
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
];


export default problems;

