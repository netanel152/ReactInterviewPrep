import { useReducer, createContext, useContext, useState } from 'react';

// --- 1. The "Redux" Logic (Pure JavaScript) ---

// Initial State
const initialState = {
  tasks: [
    { id: 1, text: 'Learn React Hooks', completed: true },
    { id: 2, text: 'Master Redux Pattern', completed: false }
  ],
  filter: 'ALL' // 'ALL', 'ACTIVE', 'COMPLETED'
};

// Reducer Function: (state, action) => newState
// This is exactly how Redux reducers work.
function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { id: Date.now(), text: action.payload, completed: false }]
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}

// Action Creators (Optional, but good practice in Redux)
const addTask = (text) => ({ type: 'ADD_TASK', payload: text });
const toggleTask = (id) => ({ type: 'TOGGLE_TASK', payload: id });
const deleteTask = (id) => ({ type: 'DELETE_TASK', payload: id });
const setFilter = (filter) => ({ type: 'SET_FILTER', payload: filter });


// --- 2. The Store Provider (Connecting React to the Logic) ---
const StoreContext = createContext();

function StoreProvider({ children }) {
  // useReducer returns [state, dispatch] - exactly what we need!
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom Hook for easier consumption
function useStore() {
  return useContext(StoreContext);
}


// --- 3. Components ---

function TaskInput() {
  const [text, setText] = useState('');
  const { dispatch } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTask(text));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        style={{ flex: 1, padding: 8 }}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskList() {
  const { state, dispatch } = useStore();

  const filteredTasks = state.tasks.filter(task => {
    if (state.filter === 'ACTIVE') return !task.completed;
    if (state.filter === 'COMPLETED') return task.completed;
    return true;
  });

  return (
    <div>
      {filteredTasks.map(task => (
        <div key={task.id} style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '8px 0',
          borderBottom: '1px solid #eee'
        }}>
          <span 
            onClick={() => dispatch(toggleTask(task.id))}
            style={{ 
              cursor: 'pointer', 
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#888' : '#000'
            }}
          >
            {task.completed ? '✅' : '⬜'} {task.text}
          </span>
          <button 
            onClick={() => dispatch(deleteTask(task.id))}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

function FilterButtons() {
  const { state, dispatch } = useStore();
  const filters = ['ALL', 'ACTIVE', 'COMPLETED'];

  return (
    <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
      {filters.map(f => (
        <button
          key={f}
          onClick={() => dispatch(setFilter(f))}
          disabled={state.filter === f}
          style={{ 
            fontWeight: state.filter === f ? 'bold' : 'normal',
            opacity: state.filter === f ? 0.6 : 1
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

// --- Main Lab Component ---
export default function ReduxPatternLab() {
  return (
    <StoreProvider>
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
        <h2>Lab G: Redux Pattern (useReducer)</h2>
        <p>Managing global state without an external library.</p>
        
        <div style={{ background: '#f9f9f9', padding: 20, borderRadius: 8 }}>
          <TaskInput />
          <TaskList />
          <FilterButtons />
        </div>

        <div style={{ marginTop: 20, padding: 10, background: '#333', color: '#fff', borderRadius: 4, fontSize: '0.8rem' }}>
          <strong>Debug State:</strong>
          <StateLogger />
        </div>
      </div>
    </StoreProvider>
  );
}

function StateLogger() {
  const { state } = useStore();
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
}
