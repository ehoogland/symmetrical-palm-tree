import React, { useState, useRef, useEffect } from 'react';
import { reactDescriptions } from '../data/reactDescriptions';
import Editor from '@monaco-editor/react';
import RankBadgeTooltip from './RankBadgeTooltip';
import Tech1Tooltip from './Tech1Tooltip';
import Tech5Tooltip from './Tech5Tooltip';

/**
 * ProblemCard
 * - Single clean component file
 * - Shows Monaco editor, Run/Reset/Format/Run Tests
 * - Displays alternatives only inside Show Solution and only the selected alternative
 */
const ProblemCard = ({ problem }) => {
  const [code, setCode] = useState(problem.starterCode || '// Your code here');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedAlt, setSelectedAlt] = useState(null);
  const [showRankInfoHeader, setShowRankInfoHeader] = useState(false);
  const [showRankInfoAlt, setShowRankInfoAlt] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const outputRef = useRef([]);
  const editorRef = useRef(null);
  const cardBodyRef = useRef(null);

  useEffect(() => {
    // delegated click handler to toggle tooltip-content for rank badges inserted via innerHTML
    const root = cardBodyRef.current;
    if (!root) return undefined;
    const onClick = (e) => {
      const el = e.target.closest && e.target.closest('.rank-badge-tooltip');
      if (el) {
        const tip = el.querySelector('.tooltip-content');
        if (tip) {
          tip.classList.toggle('show');
        }
      }
    };
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, []);

  // badge mapping (restore original behavior — no 'Moderate' custom class)
  // Keep mapping inline below to minimize churn where the badge is rendered.

  // If a problem sets clickToShowSolution=true, we hide the editor and run controls
  const clickToShowOnly = Boolean(problem.clickToShowSolution);

  const createCustomConsole = () => {
    outputRef.current = [];
    return {
      log: (...args) => outputRef.current.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')),
      error: (...args) => outputRef.current.push('Error: ' + args.join(' '))
    };
  };

  const runAndCapture = (src) => {
    const custom = createCustomConsole();
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function('console', src);
      fn(custom);
      return outputRef.current.join('\n');
    } catch (err) {
      return `__ERROR__:${err.message}`;
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    try {
      const custom = createCustomConsole();
      // eslint-disable-next-line no-new-func
      const fn = new Function('console', code);
      fn(custom);
      setOutput(outputRef.current.join('\n') || 'Code executed successfully (no output)');
      setTestResult(null);
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const runTests = () => {
    setIsRunning(true);
    setTestResult(null);
    if (!problem.solution) {
      setTestResult({ pass: false, message: 'No canonical solution available to test against.' });
      setIsRunning(false);
      return;
    }
    outputRef.current = [];
    const expected = runAndCapture(problem.solution);
    outputRef.current = [];
    const actual = runAndCapture(code);
    if (expected.startsWith('__ERROR__:')) {
      setTestResult({ pass: false, message: `Canonical solution error: ${expected.replace('__ERROR__:', '')}` });
    } else if (actual.startsWith('__ERROR__:')) {
      setTestResult({ pass: false, message: `Your code error: ${actual.replace('__ERROR__:', '')}` });
    } else if (expected === actual) {
      setTestResult({ pass: true, message: 'Test passed — output matches canonical solution.' });
    } else {
      setTestResult({ pass: false, message: `Test failed.\nExpected:\n${expected}\n\nActual:\n${actual}` });
    }
    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(problem.starterCode || '// Your code here');
    setOutput('');
    setTestResult(null);
  };

  // Render hint strings that may include <code>...</code> fragments.
  // Splits the string on <code> tags and wraps code fragments in real <code> elements,
  // preserving HTML entities (like &#36;) by using dangerouslySetInnerHTML inside the code tag only.
  const renderHint = (h) => {
    if (typeof h !== 'string') return h;
    if (!h.includes('<code>')) return h;
    const parts = h.split(/(<code>|<\/code>)/g);
    // parts will include the tags; we want content between code tags
    const nodes = [];
    let inCode = false;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part === '<code>') { inCode = true; continue; }
      if (part === '</code>') { inCode = false; continue; }
      if (inCode) {
        // render the code fragment, allow entities inside
        nodes.push(<code key={i} style={{ backgroundColor: 'rgba(0,0,0,0.06)', padding: '0 .25rem', borderRadius: 3 }} dangerouslySetInnerHTML={{ __html: part }} />);
      } else {
        nodes.push(<span key={i}>{part}</span>);
      }
    }
    return nodes;
  };

  // Render the rank badge based on problem difficulty.
  // - Easy -> tech1 (Private) small/large image with simple tooltip
  // - Novice -> Tech4 via RankBadgeTooltip (medium-sized)
  // - Medium -> tech5 image (medium-sized) with tooltip
  const renderRankBadge = (p, size = 'md') => {
    const imgClass = size === 'lg' ? 'solution-badge-lg' : (size === 'sm' ? 'solution-badge-sm' : 'solution-badge-md');
    if (!p || !p.difficulty) {
      // map imgClass -> sensible width/height for the SVG
      let w = 44; let h = 44;
      if (imgClass === 'solution-badge-lg') { w = 48; h = 60; }
      if (imgClass === 'solution-badge-sm') { w = 28; h = 34; }
      return <Tech1Tooltip width={w} height={h} imgClass={imgClass} position="left" />;
    }

    if (p.difficulty === 'Novice') {
      // use the dedicated Tech4 tooltip component; size tuned by requested size
      // map imgClass -> sensible width/height for the SVG
      let w = 44; let h = 44;
      if (imgClass === 'solution-badge-lg') { w = 48; h = 60; }
      if (imgClass === 'solution-badge-sm') { w = 28; h = 34; }
      return <RankBadgeTooltip width={w} height={h} imgClass={imgClass} compact={false} position="left" />;
    }

    if (p.difficulty === 'Medium') {
      // map imgClass -> sensible width/height for the SVG
      let w = 44; let h = 44;
      if (imgClass === 'solution-badge-lg') { w = 48; h = 60; }
      if (imgClass === 'solution-badge-sm') { w = 28; h = 34; }
      return <Tech5Tooltip width={w} height={h} imgClass={imgClass} position="left" />;
    }

    // default -> Easy/Private
    // map imgClass -> sensible width/height for the SVG
    let w = 44; let h = 44;
    if (imgClass === 'solution-badge-lg') { w = 48; h = 60; }
    if (imgClass === 'solution-badge-sm') { w = 28; h = 34; }
    return <Tech1Tooltip width={w} height={h} imgClass={imgClass} position="left" />;
  };

  return (
    <div className="card mb-4">
      <div className="card-header d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-baseline">
          <h3 className="card-title mb-0 me-2">{problem.title}</h3>
          {problem.difficulty && (
            <span className="d-inline-flex align-items-center" style={{ gap: '0.25rem', position: 'relative', top: '-0.15em' }}>
              {problem.difficulty === 'Medium' && (
                <button type="button" className="btn btn-link p-0" onClick={() => setShowRankInfoHeader(!showRankInfoHeader)} aria-label="Show rank info" style={{ lineHeight: 1 }}>
                  <svg width={28} height={28} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ display: 'block' }}>
                    <circle cx="12" cy="12" r="10" fill="#ffc107" />
                    <path d="M12 6.5 L13.4 10.2 L17.2 10.2 L14 12.6 L15.2 16.3 L12 14 L8.8 16.3 L10 12.6 L6.8 10.2 L10.6 10.2 Z" fill="#fff" opacity="0.95" />
                  </svg>
                </button>
              )}
              <span className={`badge ${problem.difficulty === 'Easy' ? 'bg-success' 
              : problem.difficulty === 'Novice' ? 'bg-novice'
              : problem.difficulty === 'Medium' ? 'bg-warning' 
              : problem.difficulty === 'Moderately High' ? 'bg-warning'
              : 'bg-danger'}`}>{problem.difficulty}</span>
            </span>
          )}
        </div>
            <div className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
          {/* Rank badge inset a little from the right edge so it visually centers under the previous card controls */}
          {/* Right-side rank artwork. If a problem requests Tech5 horizontally, render tech1 left and tech5 right aligned with lozenges */}
            <div className="header-rank d-flex flex-column align-items-end">
              <div style={{ position: 'relative' }}>
                {renderRankBadge(problem, 'lg')}
              </div>
            </div>
        </div>

        {showRankInfoHeader && (
          <div className="mt-2 p-2 small bg-light border rounded" style={{ display: 'inline-block' }} role="region" aria-label="Rank information">
            {problem.difficulty === 'Easy' && (<div><strong>Tech Private</strong><div>Easy challenge — introductory level.</div></div>)}
            {problem.difficulty === 'Medium' && (<div><strong>Yellow Challenge</strong><div>Intermediate-style challenge — extra considerations.</div></div>)}
            {problem.difficulty !== 'Easy' && problem.difficulty !== 'Medium' && (<div><strong>{problem.difficulty}</strong></div>)}
          </div>
        )}
      </div>

      <div className="card-body" ref={cardBodyRef}>
        <div className="mb-4">
          {/* If a React description exists for this problem, render it. Otherwise fall back to HTML description. */}
          {process.env.NODE_ENV === 'development' && problem && problem.id === 'print-1-to-10-reverse' && console.log('DEBUG problem.description:', problem.description)}
          {reactDescriptions[problem.id] ? (
            <div>{reactDescriptions[problem.id]}</div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: problem.description }} />
          )}
        </div>

        {!clickToShowOnly && (
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                <label className="form-label mb-0"><strong>Solution:</strong></label>
              </div>
              <div className="d-flex align-items-center">
                {problem.altSolutions && (
                  <div className="me-2 d-flex align-items-center">
                    <select className="form-select form-select-sm me-2" style={{ width: '220px' }} value={selectedAlt || ''} onChange={(e) => setSelectedAlt(e.target.value || null)}>
                      <option value="">Select alternative...</option>
                      {Object.keys(problem.altSolutions).map((key) => {
                        const title = (problem.altTitles && problem.altTitles[key]) ? problem.altTitles[key] : key.replace(/-/g, ' ');
                        return (<option key={key} value={key}>{title}</option>);
                      })}
                    </select>
                    {/* badge removed from selector area to avoid duplicate icons in header */}
                  </div>
                )}
                <div>
                  <button className="btn btn-outline-secondary btn-sm me-2" onClick={resetCode}>Reset</button>
                  <button className="btn btn-primary btn-sm" onClick={runCode} disabled={isRunning}>{isRunning ? 'Running...' : 'Run Code'}</button>
                  <button className="btn btn-secondary btn-sm ms-2" onClick={() => { const ed = editorRef.current; if (ed && ed.getAction) { const action = ed.getAction('editor.action.formatDocument'); if (action) action.run(); } }}>Format</button>
                  <button className="btn btn-success btn-sm ms-2" onClick={runTests} disabled={isRunning}>Run Tests</button>
                </div>
              </div>
            </div>

            <div style={{ 
              overflow: 'hidden',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}>
                <Editor 
                  height="280px" 
                  defaultLanguage="javascript" 
                  language="javascript" 
                  value={code} 
                  onChange={(v) => setCode(v ?? '')} 
                  options={{ 
                    automaticLayout: true, 
                    tabSize: 2, 
                    insertSpaces: true, 
                    minimap: { enabled: false }, 
                    fontFamily: 'Monaco, Consolas, "Courier New", monospace', 
                    fontSize: 14, 
                    lineHeight: 20,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    glyphMargin: false,
                    folding: false,
                    lineDecorationsWidth: 0,
                    lineNumbersMinChars: 4,
                    overviewRulerBorder: false,
                    overviewRulerLanes: 0,
                    hideCursorInOverviewRuler: true,
                    scrollbar: {
                      vertical: 'auto',
                      horizontal: 'auto'
                    }
                  }} 
                  onMount={(ed) => { 
                    editorRef.current = ed; 
                    
                    // Position cursor after "//Your code here" or "// Your code here" comment
                    const model = ed.getModel();
                    if (model) {
                      const text = model.getValue();
                      const lines = text.split('\n');
                      
                      // Find the line with the comment (with or without period)
                      const commentLineIndex = lines.findIndex(line => 
                        line.trim().match(/^\/\/\s*Your code here\.?$/i)
                      );
                      
                      if (commentLineIndex !== -1) {
                        // Position cursor at the end of the next line, or create a new line
                        const targetLine = commentLineIndex + 2; // Line after the comment (1-based)
                        const targetColumn = 1; // Beginning of line
                        
                        // Ensure there's a blank line after the comment
                        if (commentLineIndex + 1 >= lines.length || lines[commentLineIndex + 1].trim() !== '') {
                          const newText = lines.slice(0, commentLineIndex + 1).join('\n') + '\n\n' + lines.slice(commentLineIndex + 1).join('\n');
                          model.setValue(newText);
                        }
                        
                        ed.setPosition({ lineNumber: targetLine, column: targetColumn });
                        ed.focus();
                      }
                    }
                  }} 
                />
            </div>
          </div>
        )}

        {clickToShowOnly && (
          <div className="mb-3">
            <div className="alert alert-info p-2" role="status">Click <strong>Show Solution</strong> below to reveal the canonical answer for this reflection-style problem.</div>
          </div>
        )}

        {output && (<div className="mb-3"><label className="form-label"><strong>Output:</strong></label><pre className="bg-dark text-light p-3 rounded" style={{ fontSize: '0.9rem', minHeight: '60px', whiteSpace: 'pre-wrap' }}>{output}</pre></div>)}

        {problem.hints && (
          <div className="mt-4">
            <details>
              <summary className="text-muted" style={{ cursor: 'pointer' }}>Display hints...</summary>
              <div className="mt-2 p-3 bg-light rounded">
                {problem.hints.map((h, i) => (
                  <div key={i} className="mb-2"><strong>Hint {i+1}:</strong> {renderHint(h)}</div>
                ))}
              </div>
            </details>
          </div>
        )}

        {testResult && (<div className={`mt-3 alert ${testResult.pass ? 'alert-success' : 'alert-danger'}`} role="alert"><strong>{testResult.pass ? 'PASS' : 'FAIL'}</strong><div style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>{testResult.message}</div></div>)}

        {showSolution && problem.solution && (
          <div className="mt-4">
            <div className="p-3 bg-info bg-opacity-10 border border-info rounded">
              <label className="form-label mb-2" style={{ textAlign: 'left' }}><strong>Solution:</strong></label>
              {/* If the user has selected an alternative, show it first (above the canonical solution) */}
              {selectedAlt && problem.altSolutions && problem.altSolutions[selectedAlt] && (() => {
                const src = problem.altSolutions[selectedAlt];
                const pretty = selectedAlt.replace(/-/g, ' ');
                return (
                  <div key={selectedAlt} className="mt-2 p-2 bg-dark bg-opacity-5 rounded">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className="d-flex align-items-center">
                        <span style={{ display: 'inline-block', marginRight: '0.5rem' }}>
                          {renderRankBadge(problem, 'md')}
                        </span>
                        <strong className="me-2 alt-strong">Alternative ({pretty}):</strong>
                        <button type="button" className="btn btn-link p-0 ms-2" onClick={() => setShowRankInfoAlt(!showRankInfoAlt)} aria-label="Show alternative rank info" style={{ lineHeight: 1 }}>
                          <svg width={20} height={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ display: 'block' }}>
                            <circle cx="12" cy="12" r="10" fill="#ffc107" />
                            <path d="M12 7.5 L13.1 10.1 L15.8 10.1 L13.7 11.9 L14.6 14.6 L12 13 L9.4 14.6 L10.3 11.9 L8.2 10.1 L10.9 10.1 Z" fill="#fff" opacity="0.95" />
                          </svg>
                        </button>
                        {showRankInfoAlt && (<div className="ms-2 p-2 small bg-light border rounded" style={{ display: 'inline-block' }} role="region" aria-label="Alternative rank information"><div><strong>Yellow Challenge</strong></div><div>Advanced alternative: shows different looping patterns (for..in / for..of).</div></div>)}
                      </div>
                    </div>
                    <pre className="p-2 bg-light rounded" style={{ whiteSpace: 'pre-wrap', fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}>{src}</pre>
                    {/* Show alternative output by executing the selected alternative */}
                    {selectedAlt && problem.altSolutions && problem.altSolutions[selectedAlt] && (() => {
                      const altSrc = problem.altSolutions[selectedAlt];
                      const out = runAndCapture(altSrc);
                      return (
                        <div className="mt-2">
                          <label className="form-label"><strong className="alt-strong">Alternative Output:</strong></label>
                          <pre className="bg-dark text-light p-3 rounded" style={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{out.startsWith('__ERROR__:') ? `Error: ${out.replace('__ERROR__:', '')}` : out}</pre>

                          {/* JSDoc-style explanation of the Array.from usage shown below */}
                          <pre className="mt-2 p-2 bg-light rounded" style={{ whiteSpace: 'pre-wrap', fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}>{`/**
 * Create an array [10, 9, ..., 1] using Array.from and iterate it.
 *
 * @example
 * // build an array of length 10, mapping each index to 10 - i
 * const arr = Array.from({ length: 10 }, (_, i) => 10 - i);
 * // arr => [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
 * for (const num of arr) {
 *   console.log(num);
 * }
 *
 * Notes:
 * - Array.from accepts an array-like/iterable first arg; here we pass { length: 10 }.
 * - The second arg is a map function (currentValue, index). currentValue is unused (_).
 * - Use for...of to iterate values; for...in iterates indices (as strings).
 * - Equivalent patterns: [...Array(10)].map((_, i) => 10 - i) or a simple for-loop that pushes values.
 */`}</pre>
                        </div>
                      );
                    })()}
                    {problem.altHints && problem.altHints[selectedAlt] && (<div className="mt-2">{problem.altHints[selectedAlt].map((hint, i) => (<div key={i} className="mb-1"><strong>Hint {i + 1}:</strong> {hint}</div>))}</div>)}
                  </div>
                );
              })()}

              {problem.solutionIsHtml ? (
                <div className="mb-0" style={{ padding: '12px' }} dangerouslySetInnerHTML={{ __html: problem.solution }} />
              ) : (
                <pre className="mb-0" style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', padding: '12px', borderRadius: '4px', fontSize: '14px', fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}>{problem.solution}</pre>
              )}
              {/* Show canonical solution output (captured from console.log) if the solution is executable code */}
              {problem.solution && problem.solutionIsCode !== false && (() => {
                // compute and show output lazily
                const out = runAndCapture(problem.solution);
                return (
                  <div className="mt-2">
                    <label className="form-label"><strong>Solution Output:</strong></label>
                    <pre className="bg-dark text-light p-3 rounded" style={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{out.startsWith('__ERROR__:') ? `Error: ${out.replace('__ERROR__:', '')}` : out}</pre>
                  </div>
                );
              })()}
              {problem.altSolutions && Object.keys(problem.altSolutions).length > 0 && !selectedAlt && (
                <div className="mt-3">
                  <label className="form-label"><strong>Alternative solution</strong></label>
                  {selectedAlt ? (
                    null
                  ) : (
                    <div className="text-muted">Select an alternative from the dropdown to view its code and hints here.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {problem.solution && (
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-link solution-btn" onClick={() => setShowSolution(!showSolution)} style={{ color: '#6f42c1', textDecoration: 'none', fontSize: '0.9rem', padding: '0.25rem 0.5rem' }}>
              {showSolution ? (
                <>
                  <svg className="solution-icon me-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path fill="#6f42c1" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <path fill="#fff" d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                  Hide Solution
                </>
              ) : (
                <>
                  <svg className="solution-icon me-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path fill="#6f42c1" d="M9 18a3 3 0 006 0h-6zm3-16a5 5 0 00-5 5c0 3 2 4 2 6v1h6v-1c0-2 2-3 2-6a5 5 0 00-5-5z" />
                  </svg>
                  Show Solution
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemCard;