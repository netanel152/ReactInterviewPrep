import { useState, memo, useCallback } from 'react';

// קומפוננטה כבדה מלאכותית
const HeavyComponent = memo(({ onClick, label }) => {
  console.log(`Rendered: ${label}`); // תסתכל בקונסול!
  return <button onClick={onClick}>{label}</button>;
});

export default function RerenderLab() {
  const [count, setCount] = useState(0);

  // הבעיה: הפונקציה נוצרת מחדש כל רינדור
  const badHandler = () => console.log("Boom");

  // הפתרון: הפונקציה נשמרת בזיכרון
  const goodHandler = useCallback(() => console.log("Boom"), []);

  return (
    <div>
      <h2>Lab C: Memoization & Rerenders</h2>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>Increment Parent</button>

      <div style={{ marginTop: 20 }}>
        {/* זה יתרנדר כל פעם שהמונה עולה - מיותר! */}
        <HeavyComponent label="Bad Button (Rerenders)" onClick={badHandler} />

        {/* זה לא יתרנדר לעולם כי ה-Props זהים */}
        <HeavyComponent label="Good Button (Memoized)" onClick={goodHandler} />
      </div>
      <p>Open Console to see render logs.</p>
    </div>
  );
}