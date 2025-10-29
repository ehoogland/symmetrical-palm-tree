import React from 'react';
import RankBadgeTooltip from '../components/RankBadgeTooltip';

export const reactDescriptions = {
  'print-1-to-10-reverse': (
    <>
      <p>Print the numbers from 1 to 10 in reverse order (10 down to 1), each on its own line, using a for loop.</p>
      <p style={{ lineHeight: 2.5, position: 'relative' }}>
          <span className="tech4-inline" style={{ display: 'inline-block', marginRight: 8 }} aria-hidden>
            {/* Lower the compact tooltip specifically for the Print numbers problem; nudged further down */}
            <RankBadgeTooltip width={28} height={34} imgClass="solution-badge-sm" compact={true} compactTop={'28%'} compactTranslateY={'translateY(-60%)'} />
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
          <RankBadgeTooltip width={28} height={34} imgClass="solution-badge-sm" compact={true} compactTop={'8%'} compactTranslateY={'translateY(-120%)'} />
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
};

export default reactDescriptions;
