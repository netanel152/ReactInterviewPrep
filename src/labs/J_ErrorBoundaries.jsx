import React, { Component, useState } from 'react';

// --- 1. The Error Boundary Component ---
// Error Boundaries MUST be Class Components (as of React 19)
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ 
          padding: 20, 
          border: '2px solid red', 
          borderRadius: 8, 
          background: '#ffe6e6', 
          color: '#d8000c' 
        }}>
          <h2>💥 Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{ marginTop: 10, background: '#d8000c', color: 'white', border: 'none' }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

// --- 2. A Buggy Component ---
function BuggyComponent() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("I crashed!");
  }

  return (
    <div style={{ padding: 20, background: '#eee', borderRadius: 8, marginTop: 10 }}>
      <h3>I am a risky component ⚠️</h3>
      <button onClick={() => setShouldCrash(true)} style={{ background: 'orange' }}>
        Click to Crash Me
      </button>
    </div>
  );
}

// --- 3. The Lab ---
export default function ErrorBoundaryLab() {
  return (
    <div>
      <h2>Lab J: Error Boundaries</h2>
      <p>Clicking the button below will crash the child component.</p>
      <p>Without an Error Boundary, the <strong>entire app</strong> would crash (white screen).</p>

      <div style={{ display: 'grid', gap: 20 }}>
        
        {/* Scenario 1: Isolated Crash */}
        <div style={{ border: '1px solid #ccc', padding: 10, borderRadius: 8 }}>
          <h4>Scenario 1: Isolated Crash</h4>
          <p>The boundary wraps only this component.</p>
          <ErrorBoundary>
            <BuggyComponent />
          </ErrorBoundary>
        </div>

        {/* Scenario 2: Another Instance */}
        <div style={{ border: '1px solid #ccc', padding: 10, borderRadius: 8 }}>
          <h4>Scenario 2: Safe Component</h4>
          <p>This component works fine even if the one above crashes.</p>
          <button onClick={() => alert("I still work!")}>I am safe</button>
        </div>

      </div>
    </div>
  );
}
