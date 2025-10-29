import React from 'react';
import './App.css';
import ProblemCard from './components/ProblemCard';
import { problems } from './data/problems';

function App() {
  return (
    <div className="App">
      {/* Navigation Header */}
      <nav className="navbar navbar-dark bg-primary shadow-sm mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            <i className="bi bi-code-square me-2"></i>
            Fluent JavaScript
          </span>
          <span className="navbar-text">
            Interactive Coding Problems
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="mb-4">
              <h2 className="text-center mb-3">Practice JavaScript Problems</h2>
              <p className="text-muted text-center">
                Solve coding challenges with our interactive editor. 
                Write your solution and run it to see the output!
              </p>
            </div>
            
            {/* Problem Cards */}
            {problems.map(problem => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
