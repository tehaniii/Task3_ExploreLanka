import React from 'react';
import './BusStopDisplay.css';

function BusStopDisplay({ data }) {
  return (
    <div className="bus-stop-display">
      <h2>Bus Stop Display</h2>
      {Object.keys(data).map(stopId => (
        <div key={stopId} className="stop-container">
          <h3>Stop ID: {stopId}</h3>
          <ul>
            {data[stopId].map((bus, index) => (
              <li key={index} className="bus-item">
                Bus {bus.id} - Arriving at {bus.arrivalTime}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default BusStopDisplay;
