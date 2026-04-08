import React, { useState } from 'react';
import { useTrainStore } from '../../entities/train/store/trainStore';
import { useAlertStore } from '../../features/alert-system/store/alertStore';
import { Button } from '../ui/Button/Button';

export const StressTest: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const startTest = () => {
    setIsActive(true);
    const id = window.setInterval(() => {
      // 1. Generate 100 mock trains
      const mockTrains: any = {};
      for (let i = 0; i < 100; i++) {
        const id = `MOCK-${i}`;
        mockTrains[id] = {
          id,
          lineId: 'LINE-1',
          status: Math.random() > 0.9 ? 'delayed' : 'active',
          location: {
            lat: 10.82 + (Math.random() - 0.5) * 0.1,
            lng: 106.74 + (Math.random() - 0.5) * 0.1,
          },
          speed: 40 + Math.random() * 20,
          heading: Math.random() * 360,
          timestamp: Date.now(),
          delaySeconds: Math.random() > 0.9 ? Math.floor(Math.random() * 300) : 0,
          lastUpdatedClient: Date.now(),
          version: 'v1'
        };
      }
      useTrainStore.getState().batchUpdate(mockTrains);

      // 2. Random Alert Storm
      if (Math.random() > 0.95) {
        useAlertStore.getState().addAlert({
          type: 'STRESS_TEST',
          message: `SYSTEM LOAD RADIATING: 100+ Units Active`,
          severity: 'info'
        });
      }
    }, 1000); // 1Hz canonical update
    setIntervalId(id);
  };

  const stopTest = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
    setIsActive(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 2000 }}>
      {isActive ? (
        <Button variant="danger" onClick={stopTest}>STOP STRESS TEST</Button>
      ) : (
        <Button variant="control" onClick={startTest}>START ELITE STRESS TEST (100 Units)</Button>
      )}
    </div>
  );
};
