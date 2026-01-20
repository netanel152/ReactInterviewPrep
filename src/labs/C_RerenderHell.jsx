import { useState, memo, useCallback, useRef, useEffect } from 'react';

// A "Heavy" Component that flashes when it renders
const HeavyComponent = memo(({ onClick, label }) => {
  const renderCount = useRef(0);
  const divRef = useRef(null);
  
  renderCount.current++;
  
  // This effect runs on every render of this component
  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.backgroundColor = '#ffcccc'; // Flash red
      divRef.current.style.transition = 'none'; // Instant red
      
      const t = setTimeout(() => {
        if (divRef.current) {
          divRef.current.style.transition = 'background 0.3s';
          divRef.current.style.backgroundColor = '#eee';
        }
      }, 300);
      
      return () => clearTimeout(t);
    }
  }); // No dependency array = run on every render

  console.log(`Rendered: ${label}`); 

  return (
    <div 
      ref={divRef}
      style={{ 
        padding: 10, 
        margin: 10, 
        border: '1px solid #ccc', 
        background: '#eee', 
      }}
    >
      <p style={{margin: '0 0 5px 0', fontSize: '0.8rem'}}>Render Count: <strong>{renderCount.current}</strong></p>
      <button onClick={onClick}>{label}</button>
    </div>
  );
});

export default function RerenderLab() {
  const [count, setCount] = useState(0);

  // THE PROBLEM: This function is re-created on every render of 'RerenderLab'
  // causing the child to think its props have changed.
  const badHandler = () => console.log("Bad Click");

  // THE SOLUTION: useCallback memoizes the function instance.
  // It only changes if dependencies [] change (never).
  const goodHandler = useCallback(() => console.log("Good Click"), []);

  return (
    <div>
      <h2>Lab C: Memoization & Rerenders</h2>
      <p>Click "Increment Parent" to trigger a re-render of the parent container.</p>
      
      <div style={{ marginBottom: 20 }}>
        <h1>Parent Count: {count}</h1>
        <button onClick={() => setCount(c => c + 1)} style={{fontSize: '1.2rem'}}>
          + Increment Parent
        </button>
      </div>

      <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
        
        {/* Case 1: The Bad Way */}
        <div>
          <h3>❌ Bad (Re-renders)</h3>
          <p style={{fontSize: '0.8rem', maxWidth: 200}}>
            Receives a new function instance every time parent updates.
          </p>
          <HeavyComponent 
            label="Click Me" 
            onClick={badHandler} 
          />
        </div>

        {/* Case 2: The Good Way */}
        <div>
          <h3>✅ Good (Memoized)</h3>
          <p style={{fontSize: '0.8rem', maxWidth: 200}}>
            Receives the SAME function instance (via useCallback).
          </p>
          <HeavyComponent 
            label="Click Me" 
            onClick={goodHandler} 
          />
        </div>

      </div>
    </div>
  );
}
