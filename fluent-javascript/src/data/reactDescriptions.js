import React from 'react';
import Tech4Tooltip from '../components/Tech4Tooltip';

export const reactDescriptions = {
  'assignment-operators': (
    <>
      <p>Practice using compound assignment operators (<code>+=</code>, <code>*=</code>, <code>/=</code>) and logical assignment operators (<code>??=</code>, <code>||=</code>, <code>&amp;&amp;=</code>) to solve these three tasks:</p>
      <ol>
        <li>Add 50 to the variable <code>bonusPoints</code>.</li>
        <li>Multiply the value of <code>multiplier</code> by 8, then divide by 4.</li>
        <li>Assign "logged-in" to <code>userState</code> only if it's currently null.</li>
      </ol>
      <br />
      <p style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <span className="tech4-inline" style={{ display: 'inline-block', marginRight: 8 }} aria-hidden>
          {/* Assignment operators: Tech4 tooltip for completing all three tasks */}
          <Tech4Tooltip width={28} height={34} imgClass="solution-badge-sm" compact={true} compactTop={'8%'} compactTranslateY={'translateY(-120%)'} />
        </span>
        <span>
          You <i>earn a stripe</i> if you can complete all three tasks using the most appropriate assignment operators for each case.
        </span>
      </p>
    </>
  ),
  'print-1-to-10-reverse': (
    <>
      <p>Print the numbers from 1 to 10 in reverse order (10 down to 1), each on its own line, using a for loop.</p>
      <p style={{ lineHeight: 2.5, position: 'relative' }}>
          <span className="tech4-inline" style={{ display: 'inline-block', marginRight: 8 }} aria-hidden>
            {/* Lower the compact tooltip specifically for the Print numbers problem; nudged further down */}
            <Tech4Tooltip width={28} height={34} imgClass="solution-badge-sm" compact={true} compactTop={'28%'} compactTranslateY={'translateY(-60%)'} />
          </span>
          Use alternative loop constructs <code>for..in</code> or <code>for..of</code> to print the numbers in reverse order.
        </p>
    </>
  ),
  'foobar': (
    <>
      <p>Log the numbers from 1 to 100 with the following rules:</p>
      <ol>
        <li>If a number is divisible by 3, log <code>Foo</code>.</li>
        <li>If a number is divisible by 5 but not 3, log <code>Bar</code>.</li>
        <li>If a number is divisible by both 3 and 5, log <code>FooBar</code>.</li>
        <li>Otherwise, log the number itself.</li>
      </ol>
      <br />
      <p style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <span className="tech4-inline" style={{ display: 'inline-block', marginRight: 8 }} aria-hidden>
          {/* FooBar: nudge the compact tooltip slightly higher for better alignment */}
          <Tech4Tooltip width={28} height={34} imgClass="solution-badge-sm" compact={true} compactTop={'8%'} compactTranslateY={'translateY(-120%)'} />
        </span>
        <span>
          You <i>earn a stripe</i> if you can complete all three of these:
          <ol style={{ marginTop: 6 }}>
            <li>The <strong>naive</strong> solution uses if / else if (branching) and plenty of logs.</li>
            <li>The <strong>elegant</strong> string-building approach requires only two cases.</li>
            <li>The <strong>terse</strong> solution uses just one line of code.</li>
          </ol>
        </span>
      </p>
    </>
  ),
  'range-and-sum-functions': (
    <>
      <p>Write an arrow function called <code>range</code> that takes two arguments (<code>start</code> and <code>end</code>) and returns an array containing all the numbers from start up to and including end.</p>
      <p>Then create a <code>sum</code> function that takes an array of numbers and returns their sum.</p>
      <p>Test your functions by calling <code>console.log(sum(range(1, 10)))</code> which should output 55.</p>
      <br />
      <p style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <span className="tech4-inline" style={{ display: 'inline-block', marginRight: 8 }} aria-hidden>
          <Tech4Tooltip width={28} height={34} imgClass="solution-badge-sm" compact={true} compactTop={'8%'} compactTranslateY={'translateY(-120%)'} />
        </span>
        <span>
          You <i>earn a stripe</i> if you can enhance the range function with these advanced features:
          <ol style={{ marginTop: 6 }}>
            <li>Add an optional third argument <code>step</code> that indicates the increment value</li>
            <li>If no step is given, elements should go up by increments of one (default behavior)</li>
            <li>Support positive steps: <code>range(1, 10, 2)</code> should return <code>[1, 3, 5, 7, 9]</code></li>
            <li>Support negative steps: <code>range(5, 2, -1)</code> should return <code>[5, 4, 3, 2]</code></li>
          </ol>
        </span>
      </p>
    </>
  ),
  'reversing-an-array': (
    <>
      <p>Write two functions: <code>reverseArray</code> and <code>reverseArrayInPlace</code>.</p>
      <ul>
        <li><strong>reverseArray</strong>: Takes an array as argument and produces a <em>new array</em> with elements in inverse order (pure function)</li>
        <li><strong>reverseArrayInPlace</strong>: Modifies the given array by reversing its elements (side effect)</li>
      </ul>
      <p><strong>Note:</strong> Neither may use the standard <code>reverse</code> method.</p>
      <p style={{ marginTop: 12 }}><strong>Think about:</strong> Which variant do you expect to be useful in more situations? Which one runs faster?</p>
    </>
  ),
  'list-data-structure': (
    <>
      <p>Write functions to work with a linked list data structure where each node has a <code>value</code> and a <code>rest</code> property:</p>
      <ul>
        <li><code>arrayToList</code>: Builds a list structure from an array (tip: build backward from end to start)</li>
        <li><code>listToArray</code>: Produces an array from a list</li>
        <li><code>prepend</code>: Creates a new list with an element added to the front</li>
        <li><code>nth</code>: Returns the element at a given position (0-based), or undefined if not found</li>
      </ul>
      <p style={{ marginTop: 12 }}><strong>Hint:</strong> Use a for loop like <code>for (let node = list; node; node = node.rest)</code> to iterate through a list.</p>
    </>
  ),
  'deep-comparison': (
    <>
      <p>Write a function <code>deepEqual</code> that takes two values and returns <code>true</code> only if they are the same value or are objects with the same properties, where property values are equal when compared recursively.</p>
      <p><strong>Key considerations:</strong></p>
      <ul>
        <li>The <code>==</code> operator compares objects by identity, but we want to compare property values</li>
        <li>Use <code>typeof</code> to determine if values are objects</li>
        <li><strong>Exception:</strong> <code>typeof null</code> produces <code>"object"</code> (historical accident) - handle this!</li>
        <li>Use <code>Object.keys</code> to iterate over object properties</li>
        <li>Both objects must have the same number of properties</li>
        <li>Return <code>false</code> immediately when a mismatch is found</li>
      </ul>
    </>
  ),
  'tree-traversal': (
    <>
      <p>Write a recursive function named <code>traverseTree</code> that navigates through a tree data structure and prints all values in depth-first order.</p>
      <p><strong>Tree Structure:</strong> Each node has a <code>value</code> and an array of <code>children</code>, which are themselves nodes.</p>
      <p><strong>How recursion works here:</strong></p>
      <ul>
        <li>Print the current node's value</li>
        <li>For each child, recursively call <code>traverseTree</code></li>
        <li>The call stack automatically manages the traversal depth</li>
        <li>When you reach a leaf node (no children), the function returns and continues with siblings</li>
      </ul>
      <p style={{ marginTop: 12 }}>This exercise demonstrates how recursion elegantly handles nested structures—a common pattern in JavaScript applications.</p>
    </>
  ),
  'destructuring': (
    <>
      <p>Refactor the <code>phi</code> function by using array destructuring to bind the four table elements.</p>
  <p><strong>Tip:</strong> You can destructure directly in the parameter list: <code>{'function phi([n00, n01, n10, n11]) { ... }'}</code></p>
      <p style={{ marginTop: 8 }}>Destructuring improves readability by giving meaningful names to array elements instead of repeated index access.</p>
    </>
  ),
  'optional-property-access': (
    <>
      <p>Practice the optional chaining operator <code>?.</code> by writing a helper that safely reads a nested property.</p>
      <p><strong>Tip:</strong> <code>object?.address?.city</code> evaluates to <code>undefined</code> when <code>object</code> or <code>address</code> are <code>null</code> or <code>undefined</code>, instead of throwing.</p>
    </>
  ),
  'destructuring-null-safe': (
    <>
      <p>Learn how to destructure arrays safely when the input might be <code>null</code> or contain <code>undefined</code> values.</p>
      <p><strong>Pattern:</strong> combine a guard like <code>arr || []</code> with defaults in destructuring: <code>const [a = null, b = null] = arr || [];</code></p>
      <p style={{ marginTop: 8 }}>This preserves explicit <code>null</code> values and avoids runtime errors when destructuring <code>null</code> or <code>undefined</code>.</p>
    </>
  ),
};

export default reactDescriptions;

