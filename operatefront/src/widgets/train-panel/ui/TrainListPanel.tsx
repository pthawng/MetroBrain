import React from 'react';
import { useTrainStore } from '../../../entities/train/store/trainStore';
import { useInfraStore } from '../../../entities/infra/store/infraStore';

export const TrainListPanel = () => {
  const trainsState = useTrainStore(state => state.trains);
  const { tripToTrain, trains: trainsMeta } = useInfraStore();
  
  const trainList = Object.values(trainsState);

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      right: 20,
      width: '320px',
      height: 'calc(100vh - 40px)',
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '24px',
      color: '#f8fafc',
      zIndex: 100,
      overflowY: 'auto'
    }}>
      <h2 style={{ margin: '0 0 16px', fontSize: '20px', fontWeight: 600 }}>Active Trains ({trainList.length})</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {trainList.map(trip => {
          const trainId = tripToTrain[trip.id];
          const meta = trainId ? trainsMeta[trainId] : null;

          return (
            <div key={trip.id} style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: '15px', color: '#38bdf8' }}>
                    {meta?.code || trip.id.substring(0, 8)}
                  </strong>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    {meta?.carCount ? `${meta.carCount} Cars` : 'N/A'}
                  </span>
                </div>
                <span style={{ 
                  color: trip.status === 'active' ? '#4ade80' : 
                         trip.status === 'delayed' ? '#fbbf24' : '#f87171',
                  textTransform: 'uppercase',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  padding: '2px 6px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '4px',
                  height: 'fit-content'
                }}>
                  {trip.status}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
                <span>Speed: {Math.round(trip.speed)} km/h</span>
                <span>Line: {trip.lineId}</span>
              </div>
            </div>
          );
        })}
        {trainList.length === 0 && (
          <span style={{ color: '#64748b', fontSize: '14px', fontStyle: 'italic' }}>No active units detected...</span>
        )}
      </div>
    </div>
  );
};
