import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import BusStopManager from './BusStopManager';
import BusStopDisplay from './BusStopDisplay';

const socket = io('http://localhost:3001');

function App() {
  const [busStops, setBusStops] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('message', (message) => {
      const { stopId, stopData } = JSON.parse(message);
      setData(prevData => ({ ...prevData, [stopId]: stopData }));
    });

    return () => {
      socket.off('connect');
      socket.off('message');
    };
  }, []);

  const handleSubscribe = (stopId) => {
    socket.send(JSON.stringify({ action: 'subscribe', stopId }));
    setBusStops(prevStops => [...prevStops, stopId]);
  };

  const handleUnsubscribe = (stopId) => {
    socket.send(JSON.stringify({ action: 'unsubscribe', stopId }));
    setBusStops(prevStops => prevStops.filter(id => id !== stopId));
    setData(prevData => {
      const newData = { ...prevData };
      delete newData[stopId];
      return newData;
    });
  };

  return (
    <div className="App">
      <BusStopManager
        onSubscribe={handleSubscribe}
        onUnsubscribe={handleUnsubscribe}
        busStops={busStops}
      />
      <BusStopDisplay data={data} />
    </div>
  );
}

export default App;
