import { useState } from 'react';
import { List } from 'react-window';

// יצירת דאטה מזויף כבד
const hugeData = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  text: `Lead #${i} - High Performance Data`,
  value: Math.random() * 1000
}));

const Row = ({ index, style }) => (
  <div style={style} className="row-item">
    {hugeData[index].text}
  </div>
);

export default function VirtualizationLab() {
  const [useVirtual, setUseVirtual] = useState(true);

  return (
    <div className="lab-container">
      <h2>Lab A: DOM Virtualization</h2>
      <button onClick={() => setUseVirtual(!useVirtual)}>
        Toggle Mode: {useVirtual ? "🚀 Fast (Virtual)" : "🐌 Slow (Native Map)"}
      </button>

      <div className="list-container" style={{ height: 400, overflow: 'auto', border: '1px solid #ccc' }}>
        {useVirtual ? (
          // הדרך הנכונה: מרנדר רק מה שרואים
          <List
            style={{ height: 400, width: "100%" }}
            rowCount={hugeData.length}
            rowHeight={35}
            rowComponent={Row}
            rowProps={{}}
          />
        ) : (
          // הדרך השגויה: תוקע את הדפדפן
          hugeData.map(item => (
            <div key={item.id} style={{ height: 35 }}>{item.text}</div>
          ))
        )}
      </div>
    </div>
  );
}