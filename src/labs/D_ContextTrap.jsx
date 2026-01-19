import React, { useState, useContext, createContext, useEffect, useRef } from 'react';

// --- חלק 1: המלכודת (Bad Implementation) ---
// קונטקסט אחד שמחזיק הכל - גם טיימר מהיר וגם הגדרות עיצוב
const BadContext = createContext();

const BadProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const [theme, setTheme] = useState('light');

  // טיימר שרץ כל 100 מילישניות
  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 100); // 10 פעמים בשנייה!
    return () => clearInterval(interval);
  }, []);

  // הבעיה: האובייקט הזה נוצר מחדש בכל טיק של השעון
  const value = { timer, theme, setTheme };

  return <BadContext.Provider value={value}>{children}</BadContext.Provider>;
};

const BadConsumer = () => {
  // אנחנו צריכים רק את ה-Theme, אבל בגלל שהקונטקסט משולב...
  const { theme, setTheme } = useContext(BadContext);
  console.log("BadConsumer Rendered! 😡");
  // מונה רינדורים כדי להוכיח את הבעיה
  const renders = useRef(0);
  renders.current++;

  return (
    <div className="card" style={{ borderColor: 'red', borderWidth: 2 }}>
      <h3>🔴 Bad Consumer</h3>
      <p>אני משתמש רק ב-Theme, אבל מתרנדר לחינם בגלל הטיימר!</p>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'red' }}>
        Renders: {renders.current} 😱
      </div>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle Theme: {theme}
      </button>
    </div>
  );
};

// --- חלק 2: הפתרון (Split Contexts) ---
// מפצלים דאטה מהיר ודאטה איטי לקונטקסטים שונים
const TimerContext = createContext();
const ThemeContext = createContext();

const GoodProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 100);
    return () => clearInterval(interval);
  }, []);

  // אנחנו יוצרים את האובייקט הזה רק כשה-theme משתנה.
  // שינויים ב-timer לא ישפיעו על האובייקט הזה!
  const themeValue = React.useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <TimerContext.Provider value={timer}>
      {/* מעבירים את הערך הממומם (Memoized) */}
      <ThemeContext.Provider value={themeValue}>
        {children}
      </ThemeContext.Provider>
    </TimerContext.Provider>
  );
};

const GoodConsumer = () => {
  // צורכים רק את הקונטקסט הרלוונטי
  const { theme, setTheme } = useContext(ThemeContext);
  console.log("GoodConsumer Rendered! 😎");
  const renders = useRef(0);
  renders.current++;

  return (
    <div className="card" style={{ borderColor: 'green', borderWidth: 2 }}>
      <h3>🟢 Good Consumer</h3>
      <p>אני מוגן! הטיימר רץ ברקע אבל לא משפיע עלי.</p>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'green' }}>
        Renders: {renders.current} 😎
      </div>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle Theme: {theme}
      </button>
    </div>
  );
};

// --- המעבדה עצמה ---
export default function ContextTrapLab() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <div>
        <BadProvider>
          <BadConsumer />
        </BadProvider>
      </div>

      <div>
        <GoodProvider>
          <GoodConsumer />
        </GoodProvider>
      </div>
    </div>
  );
}