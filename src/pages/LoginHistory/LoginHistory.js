import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoginHistory.css';

const LoginHistory = ({ user }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const email = user[0]?.email;
      if (email) {
        const response = await axios.get('https://twix-backend.onrender.com/login-history', { params: { email } });
        const reversedHistory = response.data.reverse(); // Reverse the order of the history
        setHistory(reversedHistory);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="login-history-container">
      <h2 className="login-history-header">Login History</h2>
      <ul className="login-history-list">
        {history.map((event, index) => (
          <li key={index} className="login-history-item">
            <p><span>Timestamp:</span> {new Date(event.timestamp).toLocaleString()}</p>
            <p><span>Browser:</span> {event.browser}</p>
            <p><span>OS:</span> {event.os}</p>
            <p><span>Platform:</span> {event.platform}</p>
            <p><span>IP Address:</span> {event.ip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoginHistory;
