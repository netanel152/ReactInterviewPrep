import { useRef, useImperativeHandle, forwardRef, useState } from 'react';

// --- The Child Component (Exposing Methods) ---
// 1. We must wrap the component in forwardRef to receive the ref from the parent
const SuperInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  const [value, setValue] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  // 2. useImperativeHandle customize the instance value that is exposed to parent refs.
  useImperativeHandle(ref, () => ({
    // Exposed Method 1: Focus the input
    focus: () => {
      inputRef.current.focus();
    },
    // Exposed Method 2: Clear the value
    clear: () => {
      setValue('');
    },
    // Exposed Method 3: Trigger an internal animation
    shake: () => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    },
    // Exposed Method 4: Return current value (Getter)
    getValue: () => value
  }));

  return (
    <div className={isShaking ? 'shake-animation' : ''} style={{ display: 'inline-block' }}>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
        style={{
          padding: '10px',
          fontSize: '16px',
          border: isShaking ? '2px solid red' : '1px solid #ccc',
          borderRadius: '4px',
          transition: 'border 0.2s'
        }}
      />
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        .shake-animation {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
});


// --- The Parent Component (Controlling the Child) ---
export default function ImperativeHandleLab() {
  const childRef = useRef();

  const handleValidate = () => {
    // We can access methods exposed by the child!
    const val = childRef.current.getValue();
    
    if (val.length < 5) {
      childRef.current.shake();
      childRef.current.focus();
      alert("Error: Text too short! (Triggered from Parent)");
    } else {
      alert(`Success: "${val}" is valid!`);
    }
  };

  return (
    <div>
      <h2>Lab I: Imperative Handles (Refs)</h2>
      <p>The parent controls the child component using <code>ref</code> methods.</p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {/* Buttons that call methods on the child */}
        <button onClick={() => childRef.current.focus()}>
          Focus Input
        </button>
        
        <button onClick={() => childRef.current.clear()}>
          Clear Input
        </button>

        <button onClick={handleValidate} style={{background: '#007bff', color: 'white'}}>
          Validate & Shake
        </button>
      </div>

      <div style={{ padding: 40, background: '#f5f5f5', borderRadius: 8 }}>
        <SuperInput ref={childRef} />
      </div>

      <div style={{ marginTop: 20, fontSize: '0.9rem', color: '#666' }}>
        <strong>Note:</strong> In React, data usually flows <em>down</em> (props). 
        Using refs to call functions <em>up</em> or <em>across</em> is an escape hatch 
        and should be used sparingly (e.g., for media playback, focus management, or imperative animations).
      </div>
    </div>
  );
}
