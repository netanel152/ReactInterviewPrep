import { useState } from 'react';
import VirtualizationLab from './labs/A_Virtualization';
import RaceConditionLab from './labs/B_RaceConditions';
import RerenderLab from './labs/C_RerenderHell';
import ContextTrapLab from './labs/D_ContextTrap';
import RealTimeChartLab from './labs/E_RealTimeUpdates';


export default function App() {
  const [activeLab, setActiveLab] = useState('A');

  const renderLab = () => {
    switch (activeLab) {
      case 'A': return <VirtualizationLab />;
      case 'B': return <RaceConditionLab />;
      case 'C': return <RerenderLab />;
      case 'D': return <ContextTrapLab />;
      case 'E': return <RealTimeChartLab />;
      default: return <div>Select a Lab</div>;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
        <button onClick={() => setActiveLab('A')}>Virtualization</button>
        <button onClick={() => setActiveLab('B')}>Race Conditions</button>
        <button onClick={() => setActiveLab('C')}>Rerenders</button>
        <button onClick={() => setActiveLab('D')}>Context Trap</button>
        <button onClick={() => setActiveLab('E')}>Real-Time Updates</button>
      </nav>
      <div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 8 }}>
        {renderLab()}
      </div>
    </div>
  );
}