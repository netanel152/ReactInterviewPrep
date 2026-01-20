import { useState, useEffect } from 'react';

// --- Hook 1: useLocalStorage ---
// Mocks useState, but syncs with browser Local Storage
function useLocalStorage(key, initialValue) {
  // 1. Initialize state lazily (function) to avoid reading storage on every render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 2. Return a wrapped version of setter that updates both State and LocalStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// --- Hook 2: useDebounce ---
// Returns a value that only updates after a delay (T milliseconds)
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timer if value changes before the delay finishes
    // This is the "Debounce" magic!
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


// --- Usage Component ---
export default function CustomHooksLab() {
  // Using our custom hooks just like native ones!
  const [text, setText] = useLocalStorage('interview-search', '');
  const debouncedText = useDebounce(text, 500); // 500ms delay

  // Fake API Search Simulation
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!debouncedText) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    console.log(`Searching API for: ${debouncedText}`);
    
    // Simulate API call
    setTimeout(() => {
      setResults([
        `Result for "${debouncedText}" 1`,
        `Result for "${debouncedText}" 2`,
        `Result for "${debouncedText}" 3`,
      ]);
      setIsSearching(false);
    }, 500);
  }, [debouncedText]);


  return (
    <div>
      <h2>Lab H: Custom Hooks (Logic Reuse)</h2>
      
      <div style={{ marginBottom: 20, padding: 15, border: '1px solid #ccc', borderRadius: 8 }}>
        <h3>1. useLocalStorage</h3>
        <p>Try refreshing the page! This input remembers its value.</p>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          style={{ padding: 8, width: '100%', maxWidth: 300 }}
        />
      </div>

      <div style={{ padding: 15, border: '1px solid #ccc', borderRadius: 8, background: '#f9f9f9' }}>
        <h3>2. useDebounce</h3>
        <p>Current Value (Updates instantly): <strong>{text}</strong></p>
        <p style={{ color: 'blue' }}>
          Debounced Value (Updates after 0.5s): <strong>{debouncedText}</strong>
        </p>

        <div style={{ marginTop: 20 }}>
          {isSearching && <div>⏳ Searching...</div>}
          {!isSearching && results.map((r, i) => (
            <div key={i} style={{ padding: 5, borderBottom: '1px solid #eee' }}>{r}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
