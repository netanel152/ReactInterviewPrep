# React Interview Prep Labs 🚀

A collection of hands-on labs designed to master advanced React patterns, performance optimization, and common interview challenges.

## 🧪 Labs Overview

### [Lab A: DOM Virtualization](./src/labs/A_Virtualization.jsx)
- **Challenge:** Rendering 10,000+ items without freezing the browser.
- **Solution:** Implementing windowing/virtualization using `react-window` (v2.2.5).
- **Key Concepts:** DOM nodes recycling, scroll performance.

### [Lab B: Race Conditions](./src/labs/B_RaceConditions.jsx)
- **Challenge:** Handling asynchronous data fetching where multiple requests overlap.
- **Solution:** Using `AbortController` to cancel stale requests and prevent "last-request-wins" bugs.
- **Key Concepts:** `useEffect` cleanup, Fetch API signals.

### [Lab C: Rerender Hell](./src/labs/C_RerenderHell.jsx)
- **Challenge:** Identifying and fixing unnecessary component re-renders.
- **Key Concepts:** `React.memo`, `useMemo`, `useCallback`, Profiler API.

### [Lab D: Context Trap](./src/labs/D_ContextTrap.jsx)
- **Challenge:** Performance pitfalls of large Context providers and how they trigger global re-renders.
- **Key Concepts:** Context splitting, selector patterns, state colocation.

### [Lab E: Real-Time Updates](./src/labs/E_RealTimeUpdates.jsx)
- **Challenge:** Efficiently updating the UI with high-frequency data streams (e.g., stock tickers, chat).
- **Key Concepts:** Refs for mutable state, batching updates, throttling.

## 🛠️ Tech Stack
- **Framework:** React 19
- **Build Tool:** Vite
- **Libraries:** react-window (v2.2.5), Axios, Lodash, Recharts.

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## ⚠️ Note on `react-window`
This project uses `react-window` version **2.2.5**. 
- Import `List` or `Grid` directly (not `FixedSizeList`).
- `rowProps` or `cellProps` are **required** (pass `{}` if empty) to avoid runtime errors.