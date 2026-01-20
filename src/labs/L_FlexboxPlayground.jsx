import React, { useState } from 'react';

export default function FlexboxLab() {
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');
  const [gap, setGap] = useState(10);
  const [itemCount, setItemCount] = useState(3);

  const containerStyle = {
    display: 'flex',
    flexDirection,
    justifyContent,
    alignItems,
    gap: `${gap}px`,
    border: '2px solid #646cff',
    borderRadius: '8px',
    minHeight: '300px',
    padding: '10px',
    background: '#f8f9ff',
    transition: 'all 0.3s ease'
  };

  const itemStyle = {
    background: '#646cff',
    color: 'white',
    padding: '20px',
    borderRadius: '4px',
    minWidth: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  };

  const handleReset = () => {
    setFlexDirection('row');
    setJustifyContent('flex-start');
    setAlignItems('stretch');
    setGap(10);
    setItemCount(3);
  };

  return (
    <div className="lab-container">
      <h2>Lab L: Flexbox Playground</h2>
      <p>Interactive playground to master CSS Flexbox layouts.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Controls */}
        <div style={{ background: '#eee', padding: '15px', borderRadius: '8px', color: '#333' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>flex-direction</label>
            <select value={flexDirection} onChange={(e) => setFlexDirection(e.target.value)} style={{ width: '100%' }}>
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>justify-content</label>
            <select value={justifyContent} onChange={(e) => setJustifyContent(e.target.value)} style={{ width: '100%' }}>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>align-items</label>
            <select value={alignItems} onChange={(e) => setAlignItems(e.target.value)} style={{ width: '100%' }}>
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="baseline">baseline</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Gap: {gap}px</label>
            <input type="range" min="0" max="50" value={gap} onChange={(e) => setGap(e.target.value)} style={{ width: '100%' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Items: {itemCount}</label>
            <button onClick={() => setItemCount(Math.max(1, itemCount - 1))}>-</button>
            <button onClick={() => setItemCount(itemCount + 1)} style={{ marginLeft: '5px' }}>+</button>
          </div>

          <button 
            onClick={handleReset}
            style={{ 
              width: '100%', 
              background: '#dc3545', 
              color: 'white', 
              marginTop: '10px',
              border: 'none',
              padding: '10px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset All
          </button>

          <div style={{ marginTop: '20px', padding: '10px', background: '#333', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
            <strong>CSS Code:</strong>
            <pre style={{ margin: '5px 0' }}>{`.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  gap: ${gap}px;
}`}</pre>
          </div>
        </div>

        {/* Preview Area */}
        <div style={containerStyle}>
          {Array.from({ length: itemCount }).map((_, i) => (
            <div key={i} style={itemStyle}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
