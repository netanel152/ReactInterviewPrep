import { useState } from 'react';
import VirtualizationLab from './labs/A_Virtualization';
import RaceConditionLab from './labs/B_RaceConditions';
import RerenderLab from './labs/C_RerenderHell';
import ContextTrapLab from './labs/D_ContextTrap';
import RealTimeChartLab from './labs/E_RealTimeUpdates';
import CompoundComponentsLab from './labs/F_CompoundComponents';
import ReduxPatternLab from './labs/G_ReduxPattern';
import CustomHooksLab from './labs/H_CustomHooks';
import ImperativeHandleLab from './labs/I_ImperativeHandle';
import ErrorBoundaryLab from './labs/J_ErrorBoundaries';
import PortalsLab from './labs/K_Portals';
import FlexboxLab from './labs/L_FlexboxPlayground';


export default function App() {
  const [activeLab, setActiveLab] = useState('A');

  const renderLab = () => {
    switch (activeLab) {
      case 'A': return <VirtualizationLab />;
      case 'B': return <RaceConditionLab />;
      case 'C': return <RerenderLab />;
      case 'D': return <ContextTrapLab />;
      case 'E': return <RealTimeChartLab />;
      case 'F': return <CompoundComponentsLab />;
      case 'G': return <ReduxPatternLab />;
      case 'H': return <CustomHooksLab />;
      case 'I': return <ImperativeHandleLab />;
      case 'J': return <ErrorBoundaryLab />;
      case 'K': return <PortalsLab />;
      case 'L': return <FlexboxLab />;
      default: return <div>Select a Lab</div>;
    }
  };

  return (
    <div className="app-container">
      <nav className="nav-container">
        <button className={activeLab === 'A' ? 'active' : ''} onClick={() => setActiveLab('A')}>Virtualization</button>
        <button className={activeLab === 'B' ? 'active' : ''} onClick={() => setActiveLab('B')}>Race Conditions</button>
        <button className={activeLab === 'C' ? 'active' : ''} onClick={() => setActiveLab('C')}>Rerenders</button>
        <button className={activeLab === 'D' ? 'active' : ''} onClick={() => setActiveLab('D')}>Context Trap</button>
        <button className={activeLab === 'E' ? 'active' : ''} onClick={() => setActiveLab('E')}>Real-Time Updates</button>
        <button className={activeLab === 'F' ? 'active' : ''} onClick={() => setActiveLab('F')}>Compound Components</button>
        <button className={activeLab === 'G' ? 'active' : ''} onClick={() => setActiveLab('G')}>Redux Pattern</button>
        <button className={activeLab === 'H' ? 'active' : ''} onClick={() => setActiveLab('H')}>Custom Hooks</button>
        <button className={activeLab === 'I' ? 'active' : ''} onClick={() => setActiveLab('I')}>Imperative Handles</button>
        <button className={activeLab === 'J' ? 'active' : ''} onClick={() => setActiveLab('J')}>Error Boundaries</button>
        <button className={activeLab === 'K' ? 'active' : ''} onClick={() => setActiveLab('K')}>Portals</button>
        <button className={activeLab === 'L' ? 'active' : ''} onClick={() => setActiveLab('L')}>Flexbox</button>
      </nav>
      <div className="content-container">
        {renderLab()}
      </div>
    </div>
  );
}