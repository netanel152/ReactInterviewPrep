import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RealTimeChartLab() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // סימולציה של דאטה שנכנס בזמן אמת (כמו לידים)
    const interval = setInterval(() => {
      setData(currentData => {
        const newDataPoint = {
          time: new Date().toLocaleTimeString(),
          leads: Math.floor(Math.random() * 50) + 10, // מספר רנדומלי בין 10 ל-60
          bids: Math.floor(Math.random() * 1000) + 500
        };

        // שומרים רק את ה-20 נקודות האחרונות כדי שהגרף לא יתכווץ
        const newData = [...currentData, newDataPoint];
        if (newData.length > 20) newData.shift();

        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Lab E: Real-Time Data Visualization</h2>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="leads" stroke="#8884d8" strokeWidth={2} name="Leads / Sec" />
          <Line type="monotone" dataKey="bids" stroke="#82ca9d" strokeWidth={2} name="Total Bids ($)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}