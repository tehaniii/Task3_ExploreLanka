import React, { useState } from 'react';
import './BusStopManager.css';

function BusStopManager({ onSubscribe, onUnsubscribe, busStops }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubscribe = () => {
    onSubscribe(inputValue);
    setInputValue('');
  };

  return (
    <div className="bus-stop-manager">
      <h2>Bus Stop Manager</h2>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter bus stop ID"
          className="input-field"
        />
        <button onClick={handleSubscribe} className="subscribe-button">Subscribe</button>
      </div>
      <ul className="subscribed-stops">
        {busStops.map(stopId => (
          <li key={stopId} className="stop-item">
            {stopId}
            <button onClick={() => onUnsubscribe(stopId)} className="unsubscribe-button">Unsubscribe</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BusStopManager;
