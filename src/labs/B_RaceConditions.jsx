import { useState, useEffect } from 'react';

export default function RaceConditionLab() {
  const [id, setId] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    // 1. Setup AbortController
    const controller = new AbortController();

    setData("Loading...");

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      signal: controller.signal // 2. Connect signal
    })
      .then(res => res.json())
      .then(result => {
        // בגלל ה-Abort, הקוד הזה לא ירוץ אם הקומפוננטה בוטלה!
        setData(result.title);
      })
      .catch(err => {
        if (err.name === 'AbortError') console.log('Fetch aborted cleanly');
        else setData("Error");
      });

    // 3. Cleanup
    return () => controller.abort();
  }, [id]);

  return (
    <div>
      <h2>Lab B: Race Conditions</h2>
      <p>Try clicking fast between buttons. Only the *latest* request should win.</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setId(1)}>Fetch ID 1</button>
        <button onClick={() => setId(2)}>Fetch ID 2</button>
        <button onClick={() => setId(3)}>Fetch ID 3</button>
      </div>
      <h3>Result: {data}</h3>
    </div>
  );
}