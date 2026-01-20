import React, { createContext, useContext, useState } from 'react';

// 1. Create Context to hold the shared state
const TabsContext = createContext();

// 2. Parent Component (Provider)
// It manages the state (which tab is active) and provides it to children
function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-root" style={{ border: '1px solid #ccc', borderRadius: 8, padding: 10 }}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// 3. Sub-Component: List (Container for triggers)
function TabsList({ children }) {
  return (
    <div style={{ display: 'flex', gap: 5, borderBottom: '1px solid #eee', marginBottom: 10 }}>
      {children}
    </div>
  );
}

// 4. Sub-Component: Trigger (The button)
function TabsTrigger({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      style={{
        padding: '8px 16px',
        border: 'none',
        background: isActive ? '#007bff' : 'transparent',
        color: isActive ? 'white' : 'black',
        borderRadius: '4px 4px 0 0',
        cursor: 'pointer',
        fontWeight: isActive ? 'bold' : 'normal'
      }}
    >
      {children}
    </button>
  );
}

// 5. Sub-Component: Content (The panel)
function TabsContent({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) return null;

  return (
    <div className="tabs-content" style={{ padding: 10, animation: 'fadeIn 0.3s' }}>
      {children}
    </div>
  );
}

// 6. Attach sub-components to the main export (Dot Notation)
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;


// --- Usage Example ---
export default function CompoundComponentsLab() {
  return (
    <div>
      <h2>Lab F: Compound Components Pattern</h2>
      <p>Notice how `Tabs` doesn't take a data array props. Instead, we compose it using children.</p>
      
      <Tabs defaultValue="account">
        
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
          <Tabs.Trigger value="security">Security</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="account">
          <h3>Account Settings</h3>
          <p>Update your profile details here.</p>
        </Tabs.Content>

        <Tabs.Content value="preferences">
          <h3>Preferences</h3>
          <p>Dark Mode: <button>Toggle</button></p>
        </Tabs.Content>

        <Tabs.Content value="security">
          <h3>Security Area</h3>
          <p>********</p>
          <button style={{color: 'red'}}>Delete Account</button>
        </Tabs.Content>

      </Tabs>
    </div>
  );
}
